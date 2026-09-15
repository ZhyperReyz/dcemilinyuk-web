<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('category_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('price')->default(0);
            $table->text('image')->nullable();
            $table->string('badge')->nullable();
            $table->float('rating')->default(0);
            $table->integer('sold')->default(0);
            $table->boolean('available')->default(true);
            $table->json('variants')->nullable();
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
