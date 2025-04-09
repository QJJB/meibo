<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use \App\Http\Controllers\ProjectController;
use \App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\URL;

use App\Http\Controllers\InvitationController;


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
    Route::resource('projects', ProjectController::class);
    Route::resource('projects.tasks', TaskController::class);
});

//_________________________________________
//
// Test route création de lien d'ajout user


Route::get('/project/join/{projectId}', [InvitationController::class, 'accept'])
    ->name('project.invite')
    ->middleware('signed');

Route::post('showProjectNumber/{id}', function ($id) {
    $url = URL::temporarySignedRoute(
        'project.invite',
        now()->addMinutes(60),
        ['projectId' => $id]
    );

    return $url;
});


require __DIR__.'/auth.php';
