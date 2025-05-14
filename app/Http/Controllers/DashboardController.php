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
        $projects = $user->projects()->withPivot('user_id')->get();

        foreach ($projects as $project) {
            $creator = User::find($project->pivot->user_id);
            $project->creator_name = $creator ? $creator->name : 'Inconnu';
            $project->creator_id = $creator->id;
            $tasks = $project->tasks;
            $totalTasks = $tasks->count();
            $doneTasks = $tasks->where('status', 'done')->count();

            $project->task_ratio = $doneTasks . '/' . $totalTasks;

            $project->roles = Role::where('project_id', $project->id)
                ->whereNotIn('name', ['admin', 'guest'])
                ->get();

            // Récupérer les users du projects
            $users = User::find($project->pivot->user_id);
            $project->users = $users;

        }

        // Récupère les tâches auxquelles l'utilisateur est assigné
        $tasks = $user->tasks;



        return Inertia::render('Dashboard', [
            'projects' => $projects,
            'tasks' => $tasks,
            // 'creator' => $creator
        ]);
    }
}
