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
        $projects = $user->projects()
            ->with(['tasks', 'roles', 'users', 'creator'])
            ->get();


        $projects->transform(function ($project) {
            $totalTasks = $project->tasks->count();
            $doneTasks = $project->tasks->where('status', 'done')->count();


            return [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'start_date' => $project->start_date,
                'end_date' => $project->end_date,
                'color' => $project->color,
                'is_favorite' => $project->is_favorite,
                'created_at' => $project->created_at,
                'updated_at' => $project->updated_at,

                'creator_id' => $project->creator_id,
                'creator_name' => $project->creator?->name ?? 'Inconnu',

                'task_ratio' => $doneTasks . '/' . $totalTasks,
                'roles' => $project->roles,
                'users' => $project->users,
                'tasks' => $project->tasks->map(function ($task) {
                    return [
                        'id' => $task->id,
                        'title' => $task->title,
                        'due_date' => $task->due_date,
                        'created_by' => $task->created_by,
                    ];
                }),
            ];
        });

        // Récupère les projets auxquels l'utilisateur est associé
        // $projects = $user->projects()->get();

        // foreach ($projects as $project) {
        //     // Utilise le champ creator_id du projet
        //     $creator = User::find($project->creator_id);
        //     $project->creator_name = $creator ? $creator->name : 'Inconnu';
        //     $project->creator_id = $creator ? $creator->id : null;

        //     $tasks = $project->tasks;
        //     $totalTasks = $tasks->count();
        //     $doneTasks = $tasks->where('status', 'done')->count();

        //     $project->task_ratio = $doneTasks . '/' . $totalTasks;

        //     $project->roles = Role::where('project_id', $project->id)
        //         ->whereNotIn('name', ['admin', 'guest'])
        //         ->get();

        //     // Récupérer les users du projet (si besoin)
        //     $project->users = $project->users;
        // }

        // dd($projects);

        // Récupère les tâches auxquelles l'utilisateur est assigné
        $tasks = $user->tasks;

        return Inertia::render('Dashboard', [
            'projects' => $projects,
            'tasks' => $tasks,
        ]);
    }
}
