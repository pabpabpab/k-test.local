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
            'type_id' => $this->equipment_type_id,
            'type_name' => $this->equipment_type->type_name,
            'serial_number' => $this->serial_number,
            'comment' => $this->comment,
        ];
    }
}
