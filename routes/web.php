<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['guest']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/main', function(){
    return Inertia::render('MainPage');       
})->middleware(['auth', 'verified'])->name('main');

Route::get('/addpost', function(){
    return Inertia::render('AddPost2');       
})->middleware(['auth', 'verified'])->name('addpost');

Route::get('/gallery', function(){
    return Inertia::render('Gallery');       
})->middleware(['auth', 'verified'])->name('gallery');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile',[ProfileController::class,'storePicture'])->name('profile.storePicture');

});

Route::get('/brewery', function(){
    return Inertia::render('Brewery');       
})->middleware(['auth', 'verified'])->name('brewery');

require __DIR__.'/auth.php';
