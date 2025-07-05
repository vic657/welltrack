<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn() => response()->json(['status' => 'ok']));

// Serve React index.html for the root
Route::get('/', function () {
    return 'App is running!';
});

// Catch-all route to serve React frontend for any route
Route::get('/{any}', function () {
    return File::get(public_path('index.html'));
})->where('any', '.*');

