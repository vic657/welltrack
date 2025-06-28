<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DailyLogController;


// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes - require token
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', function () {
        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    });
    //user routes
    Route::middleware('auth:sanctum')->post('/daily-log', [DailyLogController::class, 'store']);
    Route::middleware('auth:sanctum')->get('/daily-logs/week', [DailyLogController::class, 'weeklyLogs']);
    Route::middleware('auth:sanctum')->get('/weekly-tips', [DailyLogController::class, 'weeklyTips']);
    Route::middleware('auth:sanctum')->get('/daily-log/check-today', [DailyLogController::class, 'hasTodayLog']);
    Route::middleware('auth:sanctum')->get('/daily-log/streak', [DailyLogController::class, 'streak']);
    Route::middleware('auth:sanctum')->get('/daily-log/heatmap', [DailyLogController::class, 'heatmapData']);



});


