<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use App\Models\ProjectUser;
use App\Models\ProjectRole;
use App\Models\ProjectMember;
use App\Models\User;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;



/**
 * Class ProjectController
 *
 * Ce contrôleur gère toutes les actions liées aux projets,
 * comme la création, l'affichage, la mise à jour et la suppression.
 */
class ProjectController extends Controller
{
    // Affiche tous les projets associés à l'utilisateur connecté.
    public function index() : View
    {
        $user = Auth::user(); // Récupère l'utilisateur connecté
        $projects = $user->projects; // Récupère les projets associés à cet utilisateur

        return view('projects/index', [
            'projects' => $projects
        ]);
    }

    // Affiche un projet spécifique.
    public function show($id) : View
    {
        $user = Auth::user();
        $project = Project::findOrFail($id); // Récupère le projet ou renvoie une erreur 404

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
                'name' => $member->user->name,
                'email' => $member->user->email,
                'roles' => $member->roles->pluck('name'), // on prend juste les noms des rôles
            ];
        });

        //Récupérer les roles présents dans notre projet
        $roles = Role::where('project_id', $project->id)->get();


        return view('projects/show', [
            'projects' => $project,
            'users' => $users,
            'roles' => $roles
        ]);
    }

    // Afficher le formulaire de création d'un projet
    public function create() : View
     {
        return view('projects/create');
     }

    // Enregistre un nouveau projet dans la base de données.
    public function store() : RedirectResponse
    {
        // Validation des données
        $validatedData = request()->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        // Nettoyage des données pour éviter les attaques XSS
        $validatedData['name'] = strip_tags($validatedData['name']);
        $validatedData['description'] = isset($validatedData['description']) ? strip_tags($validatedData['description']) : null;

        // Création du projet
        $project = Project::create($validatedData);

        // Associe le projet à l'utilisateur connecté
        $user = Auth::user();
        $project->users()->attach($user->id);

        // récupère le dernier user ajouter à un projet
        $projectUser = ProjectUser::where('project_id', $project->id)
            ->where('user_id', $user->id)
            ->first();


        // Récupère la dernière insertion dans la table project_members
        //dd($lastInsertedId);

        // Création des rôles
        $adminRole = Role::create(['name' => 'admin', 'project_id' => $project->id]);
        $guestRole = Role::create(['name' => 'guest', 'project_id' => $project->id]);
        //dd($adminRole->id);

        //Associer id recuperer et le lier au role admin
        $projectUser->project_roles()->create([
            'role_id' => $adminRole->id
        ]);

        // Création des permissions pour l'Admin

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    // Afficher le formulaire d'édition d'un projet
    public function edit($id)
    {
        $user = Auth::user();
        $project = Project::findOrFail($id);

        // Vérifie si l'utilisateur est associé au projet
        if (!$project->users()->where('users.id', $user->id)->exists()) {
            abort(403, 'Unauthorized');
        }
        return view('projects/edit', ['projects' => $project]);
    }

    // Met à jour un projet existant.
    public function update($id)
    {
        $user = Auth::user();
        $project = Project::findOrFail($id);

        // Vérifie si l'utilisateur est associé au projet
        if (!$project->users()->where('users.id', $user->id)->exists()) {
            abort(403, 'Unauthorized');
        }

        // Validation des données
        $validatedData = request()->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string|max:1000',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after_or_equal:start_date',
        ]);

        // Nettoyage des données pour éviter les attaques XSS
        if (isset($validatedData['name'])) {
            $validatedData['name'] = strip_tags($validatedData['name']);
        }
        if (isset($validatedData['description'])) {
            $validatedData['description'] = strip_tags($validatedData['description']);
        }

        // Mise à jour des champs
        $project->update([
            'name' => $validatedData['name'] ?? $project->name,
            'description' => $validatedData['description'] ?? $project->description,
            'start_date' => $validatedData['start_date'] ?? $project->start_date,
            'end_date' => $validatedData['end_date'] ?? $project->end_date,
        ]);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    // Supprime un projet
    public function destroy($id)
    {
        $user = Auth::user();
        $project = Project::findOrFail($id);


        // Vérifie si l'utilisateur est associé au projet
        if (!$project->users()->where('users.id', $user->id)->exists()) {
            abort(403, 'Unauthorized');
        }
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }

    //________________________________________________
    //
    // Création d'un lien d'invitation temporaire
    //
    //________________________________________________
    public function generateInviteLink($projectId)
    {
        $url = URL::temporarySignedRoute(
            'share-link',
            now()->addMinutes(30),
            ['project' => $projectId]
        );

        return redirect()->back()->with('invite_url', $url);
    }

    public function linkUsertoProject($projectId){
        $user = Auth::user(); // Récupère l'utilisateur connecté

        $project = Project::findOrFail($projectId);

        // Associe le projet à l'utilisateur connecté
        $project->users()->attach($user->id);

        return response()->json([
            'message' => 'Utilisateur ajouté au projet avec succès.',
            'project_id' => $project->id
        ]);
    }

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

    }
}
