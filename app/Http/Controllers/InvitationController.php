<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\URL;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\ProjectRole;
use App\Models\ProjectUser;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class InvitationController extends Controller
{

    public function generateInviteLink($projectId)
    {
        $project = Project::findOrFail($projectId);

        // Génère un lien signé valide pour 24 heures
        $inviteUrl = URL::temporarySignedRoute(
            'projects.invite.accept', // Nom de la route pour accepter l'invitation
            now()->addHours(24), // Durée de validité
            ['projectId' => $project->id] // Paramètres de la route
        );

        return response()->json(['invite_url' => $inviteUrl]);
    }

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

            // Vérifier que le user n'est pas déjà dans le projet
            $checkIfAllreadyInProject = ProjectMember::where('project_id', $project->id)
                ->where('user_id', $user->id)
                ->exists();

            if($checkIfAllreadyInProject != null){
                // Si il est déjà dans le projet on doit arreter le process
                return redirect('/projects');
            }


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

            return redirect('/projects')->with('success', 'Tu as rejoint le projet !');
        } else {
            // Sauvegarde temporaire en session l'ID du projet à rejoindre
            Session::put('invited_project_id', $projectId);
            return redirect()->route('login'); // ou 'login' si tu veux aussi permettre ça
        }
    }
}

