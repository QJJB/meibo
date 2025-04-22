<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use \App\Http\Controllers\ProjectController;
use \App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\PermissionController;


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

// Route gestion des roles d'un projet
Route::get('/projects/{project}/roles/edit', [RoleController::class, 'editRole'])->name('projects.roles.edit');
Route::put('/projects/{project}/roles/update', [RoleController::class, 'updateRole'])->name('projects.roles.update');
Route::put('/projects/{project}/update-roles-name', [RoleController::class, 'updateRolesName'])->name('projects.roles.update-name');
Route::post('/projects/{project}/addNewRoles', [RoleController::class, 'addNewRoles'])->name('projects.roles.store');
Route::get('/projects/{project}/addNewRolesForAUser/{user}', [RoleController::class, 'addNewRolesForAUser'])->name('projects.roles.user');
Route::post('/projects/{project}/addNewRolesForAUser/{user}', [RoleController::class, 'storeAddNewRolesForAUser'])->name('projects.roles.user');
//Suppression de role pour un user
Route::delete('/projects/{project}/roles/{role}/delete/{user}', [RoleController::class, 'destroyRoleForUser'])->name('projects.roles.user.destroy');
//Suppression d'un role pour un projet
Route::delete('/projects/{project}/roles/{role}/delete_for_project', [RoleController::class, 'destroyRoleForProject'])->name('projects.roles.destroy');


// Gestion des permissions
Route::get('/projects/{project}/permissions', [PermissionController::class, 'showPermissions'])->name('projects.permissions');


require __DIR__.'/auth.php';
