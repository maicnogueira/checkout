<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Página Inicial</title>
    <link rel="stylesheet" href="{{ asset('dist/css/style.css') }}">
</head>
<body>

<header class="container-fluid background-azul">
    <div class="row">
        <div class="col-12 hero">
            <h1>Finalizando seu pedido</h1>
            <p>Confirme seu endereço de entrega</p>
        </div>
    </div>
</header>

<main class="container">
    <form id="cadastro" method="POST" enctype="application/x-www-form-urlencoded" novalidate>
        @csrf
        <div class="row">
            <div class="col-12 col-md-6 col-lg-9 my-2">
                <label for="name" class="form-label">Seu nome</label>
                <input type="text" class="form-control" id="name" name="nome" placeholder="Seu nome" required>
            </div>

            <div class="col-12 col-md-6 col-lg-3 my-2">
                <label for="cpf" class="form-label">Seu CPF</label>
                <input type="text" class="form-control" id="cpf" name="cpf" placeholder="Seu CPF" required>
            </div>

            <div class="col-12 col-md-4 col-lg-3 my-2">
                <label for="cep" class="form-label">Seu CEP</label>
                <input type="text" class="form-control" id="cep" name="cep" placeholder="Seu CEP" required value="48430000">
            </div>

            <div class="col-12 col-md-8 col-lg-9 my-2">
                <label for="logradouro" class="form-label">Logradouro</label>
                <input type="text" class="form-control" id="logradouro" name="logradouro" placeholder="Logradouro" disabled required>
            </div>

            <div class="col-6 col-md-4 col-lg-3 my-2">
                <label for="numero" class="form-label">Número</label>
                <input type="text" class="form-control" id="numero" name="numero" placeholder="Número">
            </div>

            <div class="col-6 col-md-4 col-lg-3 my-2">
                <label for="complemento" class="form-label">Complemento</label>
                <input type="text" class="form-control" id="complemento" name="complemento" placeholder="Complemento">
            </div>

            <div class="col-12 col-md-4 col-lg-6 my-2">
                <label for="bairro" class="form-label">Bairro</label>
                <input type="text" class="form-control" id="bairro" name="bairro" placeholder="Bairro" disabled>
            </div>

            <div class="col-12 col-md-6 my-2">
                <label for="cidade" class="form-label">Cidade</label>
                <input type="text" class="form-control" id="cidade" name="cidade" placeholder="Cidade" disabled>
            </div>

            <div class="col-12 col-md-6 my-2">
                <label for="complemento" class="form-label">Estado</label>
                <select class="form-select" disabled id="estado" name="estado">
                    <option selected disabled>Selecione um item</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                </select>
            </div>

        </div>
        <div class="row">
            <div class="col-12 col-lg-6 my-2 align-self-center">
                <button type="submit" class="btn btn-petiko">Confirmar pedido</button>
            </div>
        </div>
    </form>
</main>

<script src="{{ asset('dist/js/jquery/jquery.min.js') }}"></script>
<script src="{{ asset('dist/js/bootstrap/bootstrap.bundle.min.js') }}"></script>
<script src="{{ asset('dist/js/sweetalert2/sweetalert2.min.js') }}"></script>
<script type="module" src="{{ asset('dist/js/scripts.js') }}"></script>

</body>
</html>
