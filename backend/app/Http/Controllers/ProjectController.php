<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use App\Models\User;


class ProjectController extends Controller
{
    public function home() : View
    {
        $user = Auth::user();
        $projects = $user->projects;

        return view('home', [
            'projects' => $projects
        ]);
    }

    public function show($id) : View
    {
        $user = Auth::user();
        $project = Project::findOrFail($id);

        if (!$project->users->contains($user)) {
            abort(403, 'Unauthorized');
        }

        return view('project', [
            'projects' => $project
        ]);
    }

    public function newProject() : View
     {
        return view('newproject');
     }

    public function projectPost() : RedirectResponse
    {
        $validatedData = request()->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $validatedData['name'] = strip_tags($validatedData['name']);
        $validatedData['description'] = isset($validatedData['description']) ? strip_tags($validatedData['description']) : null;

        // Création du projet
        $project = Project::create($validatedData);

        // Récupération de l'utilisateur
        $user = Auth::user();

        // Attache l'utilisateur au projet
        $project->users()->attach($user->id);

        // Création des rôles s'ils n'existent pas
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $guestRole = Role::firstOrCreate(['name' => 'guest']);

        // Associe le rôle "admin" à ce projet (si nécessaire)
        //$project->roles()->attach($adminRole->id);

        // Associe l'utilisateur à ce projet avec le rôle "admin"
        //$user->roles()->attach($adminRole->id, ['project_id' => $project->id]);

        return redirect()->route('home');
    }

}
