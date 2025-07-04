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
        $project = Project::with('creator', 'users')->findOrFail($project_id); // Récupère le projet ou renvoie une erreur 404

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
                'profile_photo' => $member->user->profile_photo,
                'roles' => $member->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name
                    ];
                }),
            ];
        });

        //Récupérer les roles présents dans notre projet
        $roles = Role::where('project_id', $project->id)->get();

        // Récupérer les tâches par statut
        $tasks = $project->tasks()->get()->groupBy('status');

        return Inertia::render('Project', [
            'projects' => $project,
            'users' => $users,
            'roles' => $roles,
            'tasksTodo' => $tasks->get('todo', collect()),
            'tasksInProgress' => $tasks->get('in_progress', collect()),
            'tasksDone' => $tasks->get('done', collect()),
        ]);
    }
}
