function notification(word = "Buscando") {
    const Toast = Swal.mixin({
        allowOutsideClick: false,
        allowEscapeKey: false,
    });

    Toast.fire({
        title: word,
        html: 'Por favor, aguarde.',
        didOpen: () => {
            Swal.showLoading()
        },
    });
}

document.querySelector("#cadastro").addEventListener("submit", (event) => {
    event.preventDefault();
    let form = document.querySelector("#cadastro");
    let teste = true;
    for (const formKey of form) {
        if (formKey.id.length > 0 && formKey.value.length === 0 || formKey.value === "Selecione um item") {
            document.querySelector(`#${formKey.id}`).classList.add("is-invalid");
            teste = false;
        } else if (formKey.id === 'cpf') {
            validarCPF(formKey.value).then((result) => {
                if (!result) {
                    document.querySelector(`#${formKey.id}`).classList.add("is-invalid");
                }
            });
        }
    }

    if (teste) {
        cadastrarPedido(form)
    }

});

document.querySelector("#cep").addEventListener("input", (event) => {
    let cep = document.querySelector("#cep");
    cep.value = mascaraCep(cep.value);
});

document.querySelector("#cpf").addEventListener("input", (event) => {
    let cpf = document.querySelector("#cpf");
    cpf.value = mascaraCpf(cpf.value);
});


function mascaraCep(cep, buscar = true) {
    let t = cep, nT = "", k;
    t = t.replace(" ", "");
    t = t.replace("-", "");
    t = t.split("").filter((value) => {
        let a = parseInt(value)
        return !isNaN(a) ?? a;
    });

    for (const tKey in t) {
        k = parseInt(tKey);
        if (k === 5) {
            nT += `-${t[k]}`;
        } else if (k < 8) {
            nT += `${t[k]}`;
        }
    }
    if (nT.length === 9 && buscar) {

        let cepsInvalidos = ['00000-000', '11111-111', '22222-222', '33333-333', '44444-444', '55555-555', '66666-666', '77777-777', '88888-888', '99999-999', '12345-678', '98765-432'];

        nT = nT.replace(" ", ``);

        if (cepsInvalidos.includes(nT)) {
            Swal.fire({
                title: 'CEP inválido',
                text: 'Por favor, verifique o CEP inserido.',
                icon: 'error',
                confirmButtonText: 'Corrigir'
            });
        }else {
            buscarDadosCep(nT)
        }

    }
    return nT;
}

function mascaraCpf(cpf) {
    let t = cpf, nT = "", k;
    t = t.replace(" ", "");
    t = t.replace("-", "");
    t = t.replace(".", "");
    t = t.split("").filter((value) => {
        let a = parseInt(value)
        return !isNaN(a) ?? a;
    });

    for (const tKey in t) {
        k = parseInt(tKey);
        if (k === 3 || k === 6) {
            nT += `.${t[k]}`;
        } else if (k === 9) {
            nT += `-${t[k]}`;
        } else if (k < 11) {
            nT += `${t[k]}`;
        }
    }
    return nT;
}

function buscarDadosCep(cep) {
    notification();

    let myHeaders = new Headers();
    let init = {method: 'GET', headers: myHeaders};

    fetch(`/api/endereco/${cep}`, init)
        .then(response => response.json())
        .then((response) => {

            let cidade = document.querySelector("#cidade");
            let estado = document.querySelector("#estado");
            let logradouro = document.querySelector("#logradouro");
            let bairro = document.querySelector("#bairro");

            if (response.hasOwnProperty("erro")) {
                Swal.fire(
                    'CEP inválido',
                    'Por favor, verifique o CEP inserido.',
                    'error'
                );

                if (!cidade.hasAttribute("disabled")) {
                    cidade.setAttribute("disabled", '');
                }
                if (!estado.hasAttribute("disabled")) {
                    estado.setAttribute("disabled", '');
                }
                if (!logradouro.hasAttribute("disabled")) {
                    logradouro.setAttribute("disabled", '');
                }
                if (!bairro.hasAttribute("disabled")) {
                    bairro.setAttribute("disabled", '');
                }

                cidade.value = "";
                estado.value = "Selecione um item";
                logradouro.value = "";
                bairro.value = "";

            } else {
                if (response.logradouro.length === 0) {
                    logradouro.removeAttribute("disabled")
                } else if (!logradouro.hasAttribute('disabled')) {
                    logradouro.setAttribute("disabled", '');
                }

                if (response.bairro.length === 0) {
                    bairro.removeAttribute("disabled")
                } else if (!bairro.hasAttribute('disabled')) {
                    bairro.setAttribute("disabled", '');
                }

                if (cidade.classList.contains("is-invalid")) {
                    cidade.classList.remove("is-invalid");
                }
                if (estado.classList.contains("is-invalid")) {
                    estado.classList.remove("is-invalid");
                }

                cidade.value = response.localidade;
                estado.value = response.uf;
                logradouro.value = response.logradouro;
                bairro.value = response.bairro;
                Swal.close()
            }
        });

}

function createListeners() {
    let form = document.querySelector('#cadastro');
    for (const item of form) {
        if (item.type === "text") {
            // console.log(item)
            item.addEventListener('input', function (evt) {
                if (evt.target.value.length > 0) {
                    if (evt.target.classList.contains("is-invalid")) {
                        evt.target.classList.remove("is-invalid")
                    }
                }
            });
        }
    }

    let cep = document.querySelector("#cep");
    cep.value = mascaraCep(cep.value, false)
}

function limparFormulario() {
    let form = document.querySelector('#cadastro');

    for (const item of form) {

        if (item.type === "text") {
            item.value = ''
            if(item.id === "logradouro" || item.id === "bairro"){
                item.setAttribute('readonly', '');
            }
        } else if (item.type === "select-one") {
            item.value = 'Selecione um item'
        }
    }

    let cep = document.querySelector("#cep");
    cep.value = mascaraCep(cep.value, false)
}

createListeners()

function cadastrarPedido(form) {

    notification('Cadastrando');

    let myHeaders = new Headers();
    let formData = new FormData(form);
    formData.append('cidade', document.querySelector('#cidade').value);
    formData.append('estado', document.querySelector('#estado').value);
    let init = {method: 'POST', headers: myHeaders, body: formData};

    fetch(`/api/criarpedido`, init)
        .then(response => response.json())
        .then((response) => {

            if (response) {
                Swal.fire({
                    title: 'Pedido cadastrado com sucesso!',
                    text: "Agora só aguardar nossos mimos chegarem em seu lar",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, por favor',
                    cancelButtonText: 'Não, obrigado'
                }).then((result) => {
                    limparFormulario()
                })
            } else {
                Swal.fire({
                    title: 'Houve uma falha no cadastro',
                    text: "Por favor, verifique os itens sou tente novamente em outro momento.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, por favor',
                    cancelButtonText: 'Não, obrigado'

                }).then((result) => {
                    limparFormulario()
                })
            }
        });
}


async function validarCPF(cpfBruto) {
    let add, rev, i, cpf;
    cpf = cpfBruto.replace(/[^\d]+/g, '');
    if (cpf === '') return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999")
        return false;
    // Valida 1o digito
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpf.charAt(10)))
        return false;
    return true;
}
