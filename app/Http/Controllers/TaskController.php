<?php

namespace App\Http\Controllers;
use Illuminate\View\View;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;


class TaskController extends Controller
{
    public function newTask($id) : View
    {
        $project = Project::findOrFail($id);
        $users = $project->users; // Récupère les utilisateurs associés au projet

        return view('newtask', [
            'project_id' => $id,
            'users' => $users // Passe les utilisateurs à la vue
        ]);
    }

    public function taskPost($id)
    {
        // Vérifie si le projet existe
        $project = Project::findOrFail($id);

        $validatedData = request()->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'priority' => 'required',
            'status' => 'required|string',
            'user_id' => 'nullable'
        ]);

        // Ajoute les valeurs dynamiques qui ne sont pas dans la requête
        $validatedData['project_id'] = $project->id;
        $validatedData['created_by'] = Auth::id();

        // Création de la tâche avec toutes les valeurs nécessaires
        $task = Task::create($validatedData);

        // Vérifie si un utilisateur a été sélectionné avant d'attacher
        if (!empty($validatedData['user_id']) && $validatedData['user_id']!=='no user found') {
            $task->assignees()->attach($validatedData['user_id']);
        }

        // Redirige vers la page du projet avec un message de succès
        return redirect()->route('home', ['id' => $project->id])->with('success', 'Task created successfully.');
    }
}
