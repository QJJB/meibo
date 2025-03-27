<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;


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

        $project = Project::create($validatedData);

        $user = Auth::user();
        $project->users()->attach($user->id);

        return redirect()->route('home');
    }
}
