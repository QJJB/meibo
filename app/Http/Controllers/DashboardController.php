<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Récupère les projets auxquels l'utilisateur est associé
        $projects = $user->projects()->withPivot('user_id')->get();

        foreach ($projects as $project) {
            $creator = User::find($project->pivot->user_id);
            $project->creator_name = $creator ? $creator->name : 'Inconnu';
        }


        // Récupère les tâches auxquelles l'utilisateur est assigné
        $tasks = $user->tasks;

        return Inertia::render('Dashboard', [
            'projects' => $projects,
            'tasks' => $tasks,
        ]);
    }
}
