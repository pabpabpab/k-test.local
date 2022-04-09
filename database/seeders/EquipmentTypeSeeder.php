<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipmentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['type_name' => 'TP-Link TL-WR74', 'serial_number_mask' => 'XXAAAAAXAA'],
            ['type_name' => 'D-Link DIR-300', 'serial_number_mask' => 'NXXAAXZXaa'],
            ['type_name' => 'D-Link DIR-300 S', 'serial_number_mask' => 'NXXAAXZXXX'],
        ];

        DB::table('equipment_types')
            ->insert($data);
    }
}

// php artisan make:seeder EquipmentTypeSeeder
