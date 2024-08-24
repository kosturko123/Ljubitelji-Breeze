<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\PostController;


Route::middleware('auth')->group(function () {

    Route::apiResource('/users', UserController::class);

});
// Osigurava da je autentifikovan korisnik
//Route::middleware('auth:sanctum')->post('/addpost', [PostController::class, 'addPost']);

//Route::post('/addpost', [PostController::class, 'addPost']);
Route::middleware('auth:sanctum')->post('/addpost', [PostController::class, 'addPost']);