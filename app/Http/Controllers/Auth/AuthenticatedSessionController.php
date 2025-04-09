<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // Vérifier s'il y a un projet en session
        if (session()->has('invited_project_id')) {
            $projectId = session()->pull('invited_project_id');  // Retirer l'ID du projet de la session
            $project = \App\Models\Project::find($projectId);

            // Si le projet existe et que l'utilisateur n'est pas déjà membre du projet
            if ($project && !$project->users->contains(Auth::user()->id)) {
                $project->users()->attach(Auth::user()->id);  // Ajouter l'utilisateur au projet

                // Récupérer le rôle 'guest' du projet
                $guestRole = \App\Models\Role::where('project_id', $projectId)
                    ->where('name', 'guest')
                    ->first();

                // Associer le rôle 'guest' à l'utilisateur pour ce projet
                $projectUser = \App\Models\ProjectUser::where('project_id', $projectId)
                    ->where('user_id', Auth::user()->id)
                    ->first();

                if ($guestRole && $projectUser) {
                    $projectUser->project_roles()->create([
                        'role_id' => $guestRole->id,
                    ]);
                }
            }
        }

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
