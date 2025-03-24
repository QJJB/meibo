<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Project;
use Inertia\Inertia;
use \App\Http\Controllers\ProjectController;

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

Route::get('/test', [ProjectController::class, 'project'])->middleware('auth');

Route::post('/test', [ProjectController::class, 'projectPost'])->middleware('auth');

Route::get('/home', function(){
    return view('home', [
        'projects' => Project::all()
    ]);
})->middleware('auth');

Route::get('/home/{id}', function($id){
    $project = Arr::first(Project::all(), fn($job) => $job['id'] ==$id);

    if(! $project){
        abort(404);
    }

    return view('project', [
        'projects' => $project
    ]);
})->middleware('auth');


require __DIR__.'/auth.php';
