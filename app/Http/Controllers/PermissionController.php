<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use App\Models\Role;
use App\Models\Project;

class PermissionController extends Controller
{
    // Affiche tous les projets associés à l'utilisateur connecté.
    public function showPermissions($projectId)
    {
        //dd($projectId);

        $roles = Role::where('project_id', $projectId)->get();
        $rolesId = $roles->pluck('id');
        dd($rolesId[0]);

        // Récupère toutes les permissions associées à ces rôles via la table pivot
        $permissions = Permission::whereHas('roles', function($query) use ($rolesId) {
            $query->whereIn('roles.id', $rolesId);
        })->get();
        dd($permissions);
    }
}
