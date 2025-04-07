<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectUser;
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

            return redirect()->route('home')->with('success', 'Tu as rejoint le projet !');
        } else {
            // Sauvegarde temporaire en session l'ID du projet à rejoindre
            Session::put('invited_project_id', $projectId);
            return redirect()->route('register'); // ou 'login' si tu veux aussi permettre ça
        }
    }
}

