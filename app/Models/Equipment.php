<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;

    protected $table = 'equipments';

    protected $fillable = [
        'equipment_type_id',
        'serial_number',
        'comment',
    ];

    protected $attributes = [
        'comment' => '',
    ];

    public function equipment_type(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(EquipmentType::class);
    }
}


