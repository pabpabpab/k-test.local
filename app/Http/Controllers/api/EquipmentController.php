<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EquipmentCollection;
use App\Http\Resources\EquipmentResource;
use App\Http\Resources\EquipmentTypeResource;
use App\Models\Equipment;
use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Requests\UpdateEquipmentRequest;
use App\Services\Equipment\SaveService;
use Illuminate\Http\JsonResponse;


class EquipmentController extends Controller
{

    public function index(): JsonResponse
    {
        // return response()->json(new EquipmentCollection(Equipment::paginate()));

        return EquipmentResource::collection(Equipment::paginate(5))
            ->response();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreEquipmentRequest  $request
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function destroy(Equipment $equipment)
    {
        //
    }
}

// php artisan make:controller EquipmentController --model=Equipment --api --resource --requests
