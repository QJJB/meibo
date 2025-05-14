<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
        /**
         * Run the migrations.
         */
        public function up()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->date('due_date')->change();
            // $table->date('date_fin')->change(); // si besoin
        });
    }

    public function down()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dateTime('due_date')->change();
            // $table->dateTime('date_fin')->change(); // si besoin
        });
    }
};
