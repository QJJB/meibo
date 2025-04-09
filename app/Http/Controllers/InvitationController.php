<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectRole;
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

        // récupère projet
        $project = Project::findOrFail($projectId);

        if (Auth::check()) {
            // Si l'utilisateur est connecté, on l'ajoute au projet
            $user = Auth::user();
            if (!$project->users->contains($user->id)) {
                $project->users()->attach($user->id);
            }

            // récupère le dernier user ajouter à un projet
            $projectUser = ProjectUser::where('project_id', $project->id)
                ->where('user_id', $user->id)
                ->first();


            // Récupère le role guest créée lors de la création du projet
            $guestRole = Role::where('project_id', $project->id)
                        ->where('name', 'guest')
                        ->first();
            //dd($guestRole->id);

            //Associe le dernier user créer à l'id de role guest
            $projectUser->project_roles()->create([
                'role_id' => $guestRole->id
            ]);

            return redirect()->route('home')->with('success', 'Tu as rejoint le projet !');
        } else {
            // Sauvegarde temporaire en session l'ID du projet à rejoindre
            Session::put('invited_project_id', $projectId);
            return redirect()->route('login'); // ou 'login' si tu veux aussi permettre ça
        }
    }
}

