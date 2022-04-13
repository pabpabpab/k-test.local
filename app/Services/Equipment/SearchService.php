<?php


namespace App\Services\Equipment;


use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use \Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class SearchService
{
    /**
     * Search equipment.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function search(Request $request): Builder
    {
        $field = $request->input('field');
        $searchText = $request->input('text') ?? '';

        return Equipment::with('equipment_type')
            ->where($field, 'like', "%$searchText%")
            ->orderByRaw("case when $field like '$searchText%' then 0 else 1 end");
    }
}
