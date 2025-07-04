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
use App\Http\Controllers\Traits\HasProjectPermission;

/**
 * Class ProjectController
 *
 * Ce contrôleur gère toutes les actions liées aux projets,
 * comme la création, l'affichage, la mise à jour et la suppression.
 */
class ProjectController extends Controller
{
    
    use HasProjectPermission;

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
        $permissions = $this->hasPermission($id);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        if (!$permissions->contains('project_read')) {
            abort(403, 'Permission denied');
        }

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
    public function store()
    {
        // Validation des données
        $validatedData = request()->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        // Ajoute le créateur du projet
        $validatedData['creator_id'] = Auth::id();

        // Nettoyage des données pour éviter les attaques XSS
        $validatedData['name'] = strip_tags($validatedData['name']);
        $validatedData['description'] = isset($validatedData['description']) ? strip_tags($validatedData['description']) : null;

        // Création du projet
        $project = Project::create($validatedData);

        // Associe le projet à l'utilisateur connecté
        $user = Auth::user();
        $project->users()->attach($user->id);

        // Récupère le dernier user ajouté à un projet
        $projectUser = ProjectUser::where('project_id', $project->id)
            ->where('user_id', $user->id)
            ->first();

        // Création des rôles
        $adminRole = Role::create(['name' => 'admin', 'project_id' => $project->id]);
        $guestRole = Role::create(['name' => 'guest', 'project_id' => $project->id]);

        // Lier les id créés aux permissions
        $adminRole->permissions()->attach([1,2,3,4,5]);
        $guestRole->permissions()->attach([1]);

        // Associer id récupéré et le lier au rôle admin
        $projectUser->project_roles()->create([
            'role_id' => $adminRole->id
        ]);


        // Création des permissions pour l'Admin
    }

    // Afficher le formulaire d'édition d'un projet
    public function edit($id)
    {
        $permissions = $this->hasPermission($id);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        if (!$permissions->contains('project_manage')) {
            abort(403, 'Permission denied');
        }

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
        $permissions = $this->hasPermission($id);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        if (!$permissions->contains('project_manage')) {
            abort(403, 'Permission denied');
        }

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

    }

    // Supprime un projet
    public function destroy($id)
    {
        $permissions = $this->hasPermission($id);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        if (!$permissions->contains('project_manage')) {
            abort(403, 'Permission denied');
        }

        $user = Auth::user();
        $project = Project::findOrFail($id);


        // Vérifie si l'utilisateur est associé au projet
        if (!$project->users()->where('users.id', $user->id)->exists()) {
            abort(403, 'Unauthorized');
        }
        $project->delete();

        return redirect()->route('dashboard')->with('success', 'Project deleted successfully.');
    }

    // Mettre le projet en favori
    public function toggleFavorite($id)
    {
        $project = Project::findOrFail($id);

        // Inverse la valeur de is_favorite
        $project->is_favorite = !$project->is_favorite;
        $project->save();

        return back()->with('is_favorite', $project->is_favorite);
    }

    //________________________________________________
    //
    // Création d'un lien d'invitation temporaire
    //
    //________________________________________________
    public function generateInviteLink($projectId)
    {
        $permissions = $this->hasPermission($projectId);

        //dd($permissions);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        if (!$permissions->contains('user_add')) {
            abort(403, 'Permission denied');
        }

        $url = URL::temporarySignedRoute(
            'project.invite',
            now()->addMinutes(60),
            ['projectId' => $projectId]
        );

        return redirect()->route('project.link', $projectId)->with('invite_url', $url);
    }

    public function link($projectId)
    {
        // Récupère le projet (facultatif, si tu veux afficher des détails du projet dans la vue)
        $project = Project::findOrFail($projectId);

        // Récupère l'URL d'invitation depuis la session
        $inviteUrl = session('invite_url');

        // Retourne la vue avec les données du projet et de l'URL
        return view('projects.link', compact('project', 'inviteUrl'));
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


}
