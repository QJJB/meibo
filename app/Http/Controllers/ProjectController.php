<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use App\Models\ProjectUser;


/**
 * Class ProjectController
 *
 * Ce contrôleur gère toutes les actions liées aux projets,
 * comme la création, l'affichage, la mise à jour et la suppression.
 */
class ProjectController extends Controller
{
    // Affiche tous les projets associés à l'utilisateur connecté.
    public function showAll() : View
    {
        $user = Auth::user(); // Récupère l'utilisateur connecté
        $projects = $user->projects; // Récupère les projets associés à cet utilisateur

        return view('home', [
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

        return view('project', [
            'projects' => $project
        ]);
    }

    // Afficher le formulaire de création d'un projet
    public function newProject() : View
     {
        return view('newproject');
     }

    // Enregistre un nouveau projet dans la base de données.
    public function projectPost() : RedirectResponse
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

        $lastProjectUser = ProjectUser::latest('id')->first();
        $lastInsertedId = $lastProjectUser->id;

        // Récupère la dernière insertion dans la table project_members
        //dd($lastInsertedId);


        // Création des rôles s'ils n'existent pas
        $adminRole = Role::create(['name' => 'admin']);
        //$guestRole = Role::firstOrCreate(['name' => 'guest']);
        //dd($adminRole->id);

        //Associer id recuperer et le lier au role admin
        $lastProjectUser->project_roles()->create([
            'role_id' => $adminRole->id
        ]);

        // Création des permissions pour l'Admin

        return redirect()->route('home');
    }

    // Afficher le formulaire d'édition d'un projet
    public function editPost($id)
    {
        $user = Auth::user();
        $project = Project::findOrFail($id);

        // Vérifie si l'utilisateur est associé au projet
        if (!$project->users()->where('users.id', $user->id)->exists()) {
            abort(403, 'Unauthorized');
        }
        return view('editproject', ['projects' => $project]);
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

        return redirect('/home')->with('success', 'Project edited successfully.');
    }

    // Supprime un projet
    public function delete($id)
    {
        $user = Auth::user();
        $project = Project::findOrFail($id);


        // Vérifie si l'utilisateur est associé au projet
        if (!$project->users()->where('users.id', $user->id)->exists()) {
            abort(403, 'Unauthorized');
        }
        $project->delete();

        return redirect('/home')->with('success', 'Project deleted successfully.');
    }
}
