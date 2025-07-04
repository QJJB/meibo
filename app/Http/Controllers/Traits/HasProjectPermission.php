<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Support\Facades\Auth;
use App\Models\Project;

trait HasProjectPermission
{
    public function hasPermission($projectId)
    {
        $user = Auth::user();

        $project = Project::findOrFail($projectId);

        // Vérifie que l'utilisateur est bien associé au projet
        if (!$project->users->contains($user)) {
            abort(403, 'Unauthorized');
        }

        // Récupère le membre du projet pour cet utilisateur avec ses rôles et permissions
        $member = $project->members()
            ->where('user_id', $user->id)
            ->with('roles.permissions')
            ->first();

        if (!$member) {
            return collect(); // Retourne une collection vide si pas de rôle
        }

        // Extrait les noms des permissions sans doublons
        $permissions = $member->roles
            ->flatMap(fn($role) => $role->permissions)
            ->pluck('name')
            ->unique()
            ->values(); // Réindexe proprement

        return $permissions;
    }
}