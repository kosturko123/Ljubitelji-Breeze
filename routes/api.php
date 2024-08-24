<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\PostController;



Route::get('/users', [UserController::class, 'index'])->name('users');
Route::post('/addpost', [PostController::class, 'addPost']);


require __DIR__.'/auth.php';
