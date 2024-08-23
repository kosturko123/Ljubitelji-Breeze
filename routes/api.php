<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;


Route::get('/users', [UserController::class, 'index'])->name('users');

require __DIR__.'/auth.php';