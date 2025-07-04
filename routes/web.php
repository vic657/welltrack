<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

// Serve React index.html for the root
Route::get('/', function () {
    return File::get(public_path('index.html'));
});

// Catch-all route to serve React frontend for any route
Route::get('/{any}', function () {
    return File::get(public_path('index.html'));
})->where('any', '.*');

