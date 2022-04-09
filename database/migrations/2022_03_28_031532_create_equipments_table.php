<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('equipment_type_id');
            $table->string('serial_number', 10);
            $table->text('comment')->default('');
            $table->timestamps();

            $table->unique('serial_number', 'serial_number_index');
            $table->index('equipment_type_id', 'equipment_type_id_index');
            $table->foreign('equipment_type_id')
                ->references('id')->on('equipment_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('equipments');
    }
}

// php artisan make:migration create_equipments_table




