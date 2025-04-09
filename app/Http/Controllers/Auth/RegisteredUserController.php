<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        // Insertion du code ici
        if (session()->has('invited_project_id')) {
            $projectId = session()->pull('invited_project_id');
            $project = \App\Models\Project::find($projectId);

            if ($project && !$project->users->contains($user->id)) {
                $project->users()->attach($user->id);

                $projectUser = \App\Models\ProjectUser::where('project_id', $projectId)
                    ->where('user_id', $user->id)
                    ->first();

                $guestRole = \App\Models\Role::where('project_id', $projectId)
                    ->where('name', 'guest')
                    ->first();

                if ($guestRole && $projectUser) {
                    $projectUser->project_roles()->create([
                        'role_id' => $guestRole->id
                    ]);
                }
            }
        }


        return redirect(route('dashboard', absolute: false));
    }
}
