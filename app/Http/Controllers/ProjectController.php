<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

class ProjectController extends Controller
{
    public function home() : View
    {
        return view('home', [
            'projects' => Project::all()
        ]);
    }

    public function show($id) : View
    {
        $project = Arr::first(Project::all(), fn($job) => $job['id'] ==$id);

        if(! $project){
            abort(404);
        }

        return view('project', [
            'projects' => $project
        ]);
    }

    public function newProject() : View
     {
        return view('test');
     }

    public function projectPost() : View
    {
        $project = Project::create(request()->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]));

        $user = Auth::user();
        $project->users()->attach($user->id);

        return view('/test');
    }
}
