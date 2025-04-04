<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use \App\Http\Controllers\ProjectController;
use \App\Http\Controllers\TaskController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/home', [ProjectController::class, 'showAll'])->name('home');
    Route::get('/home/{id}', [ProjectController::class, 'show']);
    Route::get('/home/{id}/edit', [ProjectController::class, 'editPost']);
    Route::put('/home/{id}/edit', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/home/{id}', [ProjectController::class, 'delete'])->name('projects.delete');
    Route::get('/newproject', [ProjectController::class, 'newProject']);
    Route::post('/newproject', [ProjectController::class, 'projectPost']);
});

Route::get('/home/{id}/newtask', [TaskController::class, 'newTask'])->middleware('auth');

Route::post('/home/{id}/newtask', [TaskController::class, 'taskPost'])->middleware('auth')->name('task.post');

require __DIR__.'/auth.php';
