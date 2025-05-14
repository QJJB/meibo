<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Role;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Récupère les projets auxquels l'utilisateur est associé
        $projects = $user->projects()->get();

        foreach ($projects as $project) {
            // Utilise le champ creator_id du projet
            $creator = User::find($project->creator_id);
            $project->creator_name = $creator ? $creator->name : 'Inconnu';
            $project->creator_id = $creator ? $creator->id : null;

            $tasks = $project->tasks;
            $totalTasks = $tasks->count();
            $doneTasks = $tasks->where('status', 'done')->count();

            $project->task_ratio = $doneTasks . '/' . $totalTasks;

            $project->roles = Role::where('project_id', $project->id)
                ->whereNotIn('name', ['admin', 'guest'])
                ->get();

            // Récupérer les users du projet (si besoin)
            $project->users = $project->users;
        }

        // Récupère les tâches auxquelles l'utilisateur est assigné
        $tasks = $user->tasks;

        return Inertia::render('Dashboard', [
            'projects' => $projects,
            'tasks' => $tasks,
        ]);
    }
}
