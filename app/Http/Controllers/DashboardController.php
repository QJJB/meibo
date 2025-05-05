<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Récupère les projets auxquels l'utilisateur est associé
        $projects = $user->projects;

        // Récupère les tâches auxquelles l'utilisateur est assigné
        $tasks = $user->tasks;

        return Inertia::render('Dashboard', [
            'projects' => $projects,
            'tasks' => $tasks,
        ]);
    }
}
