<?php

namespace App\Services\Equipment;

use App\Models\Equipment;
use \Illuminate\Http\Request;

class SaveService
{
    public function save(Request $request): bool
    {
        $typeId = $request->input('typeData.typeId');
        $comment = $request->input('comment') ?? '';

        $serialNumbers = $request->input('serialNumbers');
        $numbersArr = explode("\n", $serialNumbers);

        $data = [];
        foreach ($numbersArr as $serialNumber) {
            $item = [
                'equipment_type_id' => $typeId,
                'serial_number' => $serialNumber,
                'comment' => $comment
            ];
            $data[] = $item;
        }

        return Equipment::insert($data);
    }
}
