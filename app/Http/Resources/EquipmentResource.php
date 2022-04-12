<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'typeData' => [
                'typeId' => $this->equipment_type_id,
                'typeMask' => $this->equipment_type->serial_number_mask,
                'typeName' => $this->equipment_type->type_name,
            ],
            'serialNumber' => $this->serial_number,
            'comment' => $this->comment,
        ];
    }
}
