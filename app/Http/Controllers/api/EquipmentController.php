<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Requests\UpdateEquipmentRequest;
use App\Services\Equipment\SaveService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class EquipmentController extends Controller
{

    /**
     * Display resource list.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page', 5);
        return EquipmentResource::collection(Equipment::with('equipment_type')
            ->orderBy('id', 'desc')
            ->paginate($perPage))
            ->response();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreEquipmentRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreEquipmentRequest $request, SaveService $service): JsonResponse
    {
        // info($request);
        return response()->json([
            'saveSuccess' => $service->save($request)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Equipment  $equipment
     * @return \Illuminate\Http\Response
     */
    public function show(Equipment $equipment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateEquipmentRequest  $request
     * @param  \App\Models\Equipment  $equipment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEquipmentRequest $request, Equipment $equipment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Equipment  $equipment
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Equipment $equipment): JsonResponse
    {
        return response()->json([
            'success' => $equipment->delete()
        ]);
    }
}

// php artisan make:controller EquipmentController --model=Equipment --api --resource --requests
