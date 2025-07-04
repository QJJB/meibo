<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use App\Models\Role;
use App\Models\Project;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Traits\HasProjectPermission;

class PermissionController extends Controller
{
    
    use HasProjectPermission;

    // Affiche tous les projets associés à l'utilisateur connecté.
    public function showPermissions($projectId)
    {
        //dd($projectId);
        $permissions = $this->hasPermission($projectId);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        if (!$permissions->contains('project_read')) {
            abort(403, 'Permission denied');
        }

        $roles = Role::where('project_id', $projectId)->get();
        $rolesId = $roles->pluck('id');
        //dd($rolesId[0]);

        // Récupère toutes les permissions
        $recupPermission = Permission::select('id', 'name')->get();
        //dd($recupPermission);

        // Test code
        $roles = Role::with('permissions')
            ->where('project_id', $projectId)
            ->get();
        //dd($roles);


        return view('projects.permission', [
            'projects' => $projectId,
            'roles' => $roles,
            'permissions' => $recupPermission
        ]);


        // depuis permission récupère les roles étant lié à la permission 1
        //$recupRoless = Permission::where('id', 1)->with('roles:id,name,project_id')->get();
        /*$recupRoless = Permission::where('id', 1)
            ->with(['roles' => function($query) {
                $query->where('project_id', 16)->select('id', 'name', 'project_id');
            }])
            ->get();*/

        //dd($recupRoless);

        /*foreach ($recupRoless as $permission) {
            echo "Permission: " . $permission->name . "\n";

            foreach ($permission->roles as $role) {
                echo "- Role: " . $role->name . "\n";
                echo "  Pivot Role ID: " . $role->id . "\n";
            }
        }*/

        //dd($recupRoless);

        //dd($recupRoless);
        /*$recupRoles = Permission::find(1);
        foreach ($recupRoles->roles as $role) {
            print_r($role);
        }*/

        // Récupère toutes les permissions associées à ces rôles via la table pivot
        /*$permissions = Permission::whereHas('roles', function($query) use ($rolesId) {
            $query->whereIn('roles.id', $rolesId);
        })->get();
        dd($permissions);*/
    }
    public function deletePermissions($projectId, $permissionId, $rolesId)
    {
        $permissions = $this->hasPermission($projectId);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        if (!$permissions->contains('project_manage')) {
            abort(403, 'Permission denied');
        }

        // Récupérer le rôle
        $role = Role::findOrFail($rolesId);

        if($role->name == "admin" || $role->name == "guest"){
            return redirect()->back();
        }

        // Détacher la permission spécifique
        $role->permissions()->detach($permissionId);

        return redirect()->back();

    }

    public function storePermission($projectId, $rolesId)
    {
        $permissions = $this->hasPermission($projectId);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        if (!$permissions->contains('project_manage')) {
            abort(403, 'Permission denied');
        }
        // Récupération du rôle
        $role = Role::findOrFail($rolesId);

        if($role->name == "admin" || $role->name == "guest"){
            return redirect()->back();
        }

        $permissionId = request('permission_id');

        // Vérifier que le user n'a pas déjà cette permission
        $exists = DB::table('role_permissions')
            ->where('role_id', $rolesId)
            ->where('permission_id', $permissionId)
            ->exists();

        if($exists){
            return redirect()->back();
        }

        // Lier les id créer aux permissions
        $role->permissions()->attach([$permissionId]);
        return redirect()->back();
    }
}
