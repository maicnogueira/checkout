<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCriarPedidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criar_pedidos', function (Blueprint $table) {
            $table->integerIncrements('id');
            $table->string('nome', 100);
            $table->string('cpf', 14);
            $table->string('cep', 9);
            $table->string('logradouro', 100);
            $table->string('numero', 4);
            $table->string('complemento', 100);
            $table->string('bairro', 50);
            $table->string('cidade', 50);
            $table->string('estado', 2);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('criar_pedidos');
    }
}
