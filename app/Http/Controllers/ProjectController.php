<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use App\Models\User;
use App\Models\ProjectUser;
use App\Models\ProjectRole;


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

}
