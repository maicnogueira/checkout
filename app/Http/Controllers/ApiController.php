<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CriarPedido;
use function GuzzleHttp\Promise\all;

class ApiController extends Controller
{

    public function getEndereco ($cep) {
        $url = "https://viacep.com.br/ws/$cep/json/";
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        $resultado = json_decode(curl_exec($curl));

        if(isset($resultado->{'erro'}) && $resultado->{'erro'}){
            $url = "https://api.postmon.com.br/v1/cep/$cep";
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            $resultado = json_decode(curl_exec($curl));
        }

        if(empty($resultado)){
            $resultado = json_encode(['erro' => true]);
        }

        return $resultado;
    }

    public function createPedido (Request $request) {

        $validar = $this->getEndereco($request->input('cep'));

        $pedido = new CriarPedido();
        $pedido->nome = $request->input('nome');
        $pedido->cpf = $request->input('cpf');
        $pedido->cep = $request->input('cep');
        $pedido->logradouro = $request->input('logradouro');
        $pedido->numero = $request->input('numero');
        $pedido->complemento = $request->input('complemento');
        $pedido->bairro = $request->input('bairro');
        $pedido->cidade = $request->input('cidade');
        $pedido->estado = $request->input('estado');

        if(
            empty($request->input('nome')) ||
            empty($request->input('cpf')) ||
            empty($request->input('cep')) ||
            empty($request->input('logradouro')) ||
            empty($request->input('numero')) ||
            empty($request->input('complemento')) ||
            empty($request->input('bairro')) ||
            empty($request->input('cidade')) ||
            empty($request->input('estado'))
        ){
            return $this->responseFalse();
        }



        if($request->input('cidade') !== $validar->{'localidade'}){
            return $this->responseFalse();
        }

        if($request->input('estado') !== $validar->{'uf'}){
            return $this->responseFalse();
        }

        return response()->json($pedido->save());
    }

    private function responseFalse(){
        return response()->json(false);
    }

}
