<?php

namespace App\Services\Equipment;

use App\Models\Equipment;
use \Illuminate\Http\Request;

class SaveService
{
    /**
     * Save equipment list.
     *
     * @param \Illuminate\Http\Request $request
     * @return bool
     */
    public function create(Request $request): bool
    {
        $typeId = $request->input('typeData.typeId');
        $comment = $request->input('comment') ?? '';
        $serialNumbers = $request->input('serialNumber');
        $serialNumbersArr = explode("\n", $serialNumbers);

        $data = [];
        foreach ($serialNumbersArr as $serialNumber) {
            $item = [
                'equipment_type_id' => $typeId,
                'serial_number' => $serialNumber,
                'comment' => $comment
            ];
            $data[] = $item;
        }

        return Equipment::insert($data);
    }

    /**
     * Update single equipment.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Equipment $equipment
     * @return bool
     */
    public function update(Request $request, Equipment $equipment): bool
    {
        $equipment->equipment_type_id = $request->input('typeData.typeId');
        $equipment->comment = $request->input('comment') ?? '';
        $equipment->serial_Number = $request->input('serialNumber');
        return $equipment->save();
    }
}
