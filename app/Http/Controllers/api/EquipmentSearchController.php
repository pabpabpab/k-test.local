<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use App\Services\Equipment\SearchService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EquipmentSearchController extends Controller
{
    /**
     * Search equipment.
     *
     * @param \App\Services\Equipment\SearchService $service
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(SearchService $service, Request $request): JsonResponse
    {
        $perPage = $request->query('per_page', 5);
        return EquipmentResource::collection(
            $service->search($request)
            ->paginate($perPage)
        )->response();
    }
}

// php artisan make:controller api/EquipmentSearchController
