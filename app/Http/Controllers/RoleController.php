<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\ProjectRole;
use App\Models\ProjectUser;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
    // Fonction gestion role d'un projet
    public function editRole($id)
    {
        $project = Project::findOrFail($id);

        // Optionnel : vérifie que l'utilisateur peut accéder
        if (!$project->users->contains(Auth::user())) {
            abort(403, 'Unauthorized');
        }

        $membersWithRoles = $project->members()
            ->with(['user', 'roles'])
            ->get();

        $allRoles = Role::where('project_id', $project->id)
            ->get();

        return view('projects.editRole', [
            'project' => $project,
            'members' => $membersWithRoles,
            'allRoles' => $allRoles
        ]);
    }

    public function updateRole(Request $request, Project $project)
    {
        $user = Auth::user();
        if (!$project->users()->where('users.id', $user->id)->exists()) {
            abort(403, 'Unauthorized');
        }


        $rolesInput = $request->input('roles', []);
        //Récupère l'id du role admin
        $adminRoleId = Role::where('name', 'admin')->first()?->id;

        if (!$adminRoleId) {
            return back()->withErrors(['error' => 'Le rôle admin est introuvable.']);
        }

        // Vérifie s'il y a au moins un user avec le rôle admin
        $hasAdmin = false;
        foreach ($rolesInput as $userId => $roleIds) {
            if (in_array($adminRoleId, $roleIds)) {
                $hasAdmin = true;
                break;
            }
        }

        if (!$hasAdmin) {
            return back()->withErrors(['error' => 'Il doit y avoir au moins un membre avec le rôle admin.']);
        }

        foreach ($request->input('roles', []) as $userId => $roleIds) {
            // On récupère le membre du projet
            $member = ProjectMember::where('project_id', $project->id)
                ->where('user_id', $userId)
                ->first();

            if ($member) {
                // On détache tous les rôles existants pour ce membre
                $member->roles()->sync($roleIds); // Met à jour les rôles via la relation many-to-many
            }
        }

        return redirect()->route('projects.show', $project->id)->with('success', 'Roles updated successfully!');
    }

    public function updateRolesName(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        if (!$project->users->contains(Auth::user())) {
            abort(403, 'Unauthorized');
        }

        $rolesInput = $request->input('roles', []);

        foreach ($rolesInput as $roleId => $newName) {
            $role = Role::where('id', $roleId)->where('project_id', $project->id)->first();

            if ($role && $newName !== $role->name) {
                $role->name = $newName;
                $role->save();
            }
        }

        return redirect()->route('projects.show', $project->id)->with('success', 'Les noms des rôles ont été mis à jour.');
    }

    public function addNewRoles(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        //dd($project->id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $validatedData['project_id'] = $project->id;

        // Création du projet
        Role::create($validatedData);


        return redirect()->route('projects.show', $project->id)->with('success', 'Les rôles ont été mis à jour.');
    }

    /*public function addNewRolesForAUser(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        //dd($project->id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $validatedData['project_id'] = $project->id;

        // Création du projet
        Role::create($validatedData);


        return redirect()->route('projects.show', $project->id)->with('success', 'Les rôles ont été mis à jour.');
    }*/

    public function addNewRolesForAUser(Request $request, $id, $user_id)
    {
        $project = Project::findOrFail($id);

        $user = User::findOrFail($user_id);

        // Optionnel : vérifie que l'utilisateur peut accéder
        if (!$project->users->contains(Auth::user())) {
            abort(403, 'Unauthorized');
        }

        $allRoles = Role::where('project_id', $project->id)
            ->get();

        return view('projects.linkMultipleRole', [
            'project' => $project,
            'allRoles' => $allRoles,
            'user' => $user
        ]);
    }

    public function storeAddNewRolesForAUser($project, $user, Request $request){

        $roleID = $request->roles[$user][0];

        // Vérifier que le user n'a pas déjà ce role
        $checkIfAllreadyInProject = ProjectRole::where('project_members_id', $project)
            ->where('role_id', $roleID)
            ->exists();

        // Si l'user à déjà le role, empêche son ajout
        if($checkIfAllreadyInProject != null){
            return redirect()->route('projects.show', $project);
        }

        // récupère l'user dans la table project_member un projet
        $projectUser = ProjectUser::where('project_id', $project)
            ->where('user_id', $user)
            ->first();

        //Associe le dernier user créer à l'id de role
        $projectUser->project_roles()->create([
            'role_id' => $roleID
        ]);

        return redirect()->back();

    }

    // Suppression d'un role pour un user
    public function destroyRoleForUser($projectId, $roleId, $userId)
    {

        // récupère l'id dans la table project_members
        $project_roles_id = ProjectMember::where('user_id', $userId)->where('project_id', $projectId)->first();

        // Code pas corrère ici
        // Le bon code serait d'avoir un code qui vérifie qu'il y ai au moins un admin dans le projet
        // Code empêchant la suppression du role admin et guest pour les projets
        /*$role = Role::findOrFail($roleId);
        if($role->name == "admin" || $role->name == "guest"){
            return redirect()->back();
        }*/

        // Vérification qu'il y a au moins un admin dans le projet
        $role = Role::findOrFail($roleId);
        if($role->name == "admin"){
            //dd($role->id);
            $check_role_admin = ProjectRole::where('role_id', $role->id)->get();
            //dd(count($check_role_admin));
            if(count($check_role_admin)<=1){
                return redirect()->back();
            }
        }

        // Vérification que le user conserve au moins un rôle
        $check_roles = ProjectRole::where('project_members_id', $project_roles_id->id)->get();
        //dd(count($check_roles));
        if(count($check_roles)<=1){
            return redirect()->back();
        }

        // Je supprime le lien entre la table project_members et project_roles
        $project_roles_fordel = ProjectRole::where('project_members_id', $project_roles_id->id)->where('role_id', $roleId)->first();
        $project_roles_fordel->delete();

        return redirect()->back()->with('success', 'Rôle supprimé avec succès.');
    }

    // Suppression d'un role dans un projet
    public function destroyRoleForProject($projectId, $roleId){
        //dd($projectId, $roleId);
        // Faire attention aux liens avec les tâches dans table 'task_roles'
        // Dois empêcher la suppression des rôles guest et admin
        // Dois faire attention à ce qu'un utilisateur ne se retrouve pas sans rôle

        // Code empêchant la suppression du role admin et guest pour les projets
        $role = Role::findOrFail($roleId);
        if($role->name == "admin" || $role->name == "guest"){
            return redirect()->back();
        }

        // Vérification que les users conservent au moins un rôle dans le projet
        // Récupère des users(id) dans la tbale project_members
        $project_member = ProjectMember::where('project_id', $projectId)->get();
        //dd($project_member[0]->id);
        //dd($project_member[1]->id);

        foreach ($project_member as $member)
            // Vérification que les users conservent au moins un rôle
            $roleCount = ProjectRole::where('project_members_id', $member->id)->where('role_id', $roleId)->count();
        //dd(count($check_roles));
        // Si un user se retrouve sans rôle on annul la requête
        if($roleCount>=1){
            return redirect()->back();
        }

        // Je supprime le lien entre la table project_members et project_roles
        $role_to_delete = Role::where('id', $roleId)->first();
        //dd($role_to_delete);
        $role_to_delete->delete();

        return redirect()->back()->with('success', 'Rôle supprimé avec succès.');
    }

}
