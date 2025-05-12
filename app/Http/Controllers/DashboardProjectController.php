<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Role;


class DashboardProjectController extends Controller
{
    public function index($project_id)
    {
        // Sécuriser les routes avec les permissions

        //$user = Auth::user(); // Récupère l'utilisateur connecté
        //$projects = $user->projects; // Récupère les projets associés à cet utilisateur


        //$permissions = $this->hasPermission($id);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        /*if (!$permissions->contains('project_read')) {
            abort(403, 'Permission denied');
        }*/

        $user = Auth::user();
        $project = Project::findOrFail($project_id); // Récupère le projet ou renvoie une erreur 404

        // Vérifie si l'utilisateur connecté est associé au projet
        if (!$project->users->contains($user)) {
            abort(403, 'Unauthorized'); // Renvoie une erreur 403 si non autorisé
        }

        // On récupère les ProjectMembers du projet, avec leurs users et rôles
        $membersWithRoles = $project->members()
            ->whereHas('roles') // filtre uniquement ceux qui ont des rôles
            ->with(['user', 'roles']) // eager load user et roles
            ->get();

        // On transforme ça pour avoir une liste de users avec leurs rôles
        $users = $membersWithRoles->map(function ($member) {
            return [
                'id' => $member->user->id,
                'name' => $member->user->name,
                'email' => $member->user->email,
                'roles' => $member->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name
                    ];
                }),
            ];
        });

        //dd($users);

        //Récupérer les roles présents dans notre projet
        $roles = Role::where('project_id', $project->id)->get();

        // Récupérer les tâches par statut
        $tasksTodo = $project->tasks()->where('status', 'todo')->get();
        $tasksInProgress = $project->tasks()->where('status', 'in_progress')->get();
        $tasksDone = $project->tasks()->where('status', 'done')->get();

        return Inertia::render('Project', [
            'projects' => $project,
            'users' => $users,
            'roles' => $roles,
            'tasksTodo' => $tasksTodo,
            'tasksInProgress' => $tasksInProgress,
            'tasksDone' => $tasksDone,
        ]);
    }
}
