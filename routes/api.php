<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VisitController;



Route::get('/api/visits', [VisitController::class, 'index']);
Route::post('/visits', [VisitController::class, 'store']);
