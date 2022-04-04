<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::apiResource('pedido','App\Http\Controllers\ApiController');

Route::get('/endereco/{cep}', 'App\Http\Controllers\ApiController@getEndereco');
Route::post('/criarpedido', 'App\Http\Controllers\ApiController@createPedido');
Route::put('/pedido/{id}', 'App\Http\Controllers\ApiController@updatePedido');
Route::delete('/pedido/{id}','App\Http\Controllers\ApiController@deletePedido');

