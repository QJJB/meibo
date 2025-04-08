<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectUser;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class InvitationController extends Controller
{
    public function accept(Request $request, $projectId)
    {
        if (!$request->hasValidSignature()) {
            abort(401, 'Lien invalide ou expiré.');
        }

        $project = Project::findOrFail($projectId);

        if (Auth::check()) {
            // Si l'utilisateur est connecté, on l'ajoute au projet
            $user = Auth::user();
            if (!$project->users->contains($user->id)) {
                $project->users()->attach($user->id);
            }

            $lastProjectUser = ProjectUser::latest('id')->first();

            // Création du rôle guest pour le nouvel user
            // si on le fait de cette facon va y avoir un problème pcq va créer
            // un role guest individuel pour chaque user
            $guestRole = Role::create(['name' => 'guest']);
            //dd($adminRole->id);

            //Associer id recuperer et le lier au role admin
            $lastProjectUser->project_roles()->create([
                'role_id' => $guestRole->id
            ]);

            return redirect()->route('home')->with('success', 'Tu as rejoint le projet !');
        } else {
            // Sauvegarde temporaire en session l'ID du projet à rejoindre
            Session::put('invited_project_id', $projectId);
            return redirect()->route('register'); // ou 'login' si tu veux aussi permettre ça
        }
    }
}

