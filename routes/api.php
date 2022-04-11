<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\api\EquipmentController;
use \App\Http\Controllers\api\EquipmentTypeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
\Illuminate\Support\Facades\DB::listen(function($query) {
    info($query->sql, $query->bindings);
});
*/
/*
Route::get('/equipment', [EquipmentController::class, 'index']);
Route::get('/equipment/{equipment}', [EquipmentController::class, 'show']);
Route::post('/equipment', [EquipmentController::class, 'store']);
Route::put('/equipment/{equipment}',  [EquipmentController::class, 'update']);
Route::delete('/equipment/{equipment}',  [EquipmentController::class, 'destroy']);
*/
Route::apiResource('equipment', EquipmentController::class);

Route::get('/equipment-types', [EquipmentTypeController::class, 'index']);

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/


