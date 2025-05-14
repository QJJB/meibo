<?php

namespace App\Http\Controllers;
use Illuminate\View\View;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{// Vérification des autorisations
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

    public function index($id)
    {

        $user = Auth::user();   // Récupère l'utilisateur connecté
        $projects = Project::findOrFail($id); // Récupère le projet ou renvoie une erreur 404

        // Vérifie si l'utilisateur connecté est associé au projet
        if (!$projects->users->contains($user)) {
            abort(403, 'Unauthorized'); // Renvoie une erreur 403 si non autorisé
        }

        $tasks = $projects->tasks; // Récupère les tâches associées à ce projet

        return view('tasks/index', [
            'tasks' => $tasks,
            'projects' => $projects
        ]);
    }

    public function show($projectId, $taskId)
    {
        $user = Auth::user();
        $projects = Project::findOrFail($projectId); // Récupère le projet ou renvoie une erreur 404

        // Vérifie si l'utilisateur connecté est associé au projet
        if (!$projects->users->contains($user)) {
            abort(403, 'Unauthorized'); // Renvoie une erreur 403 si non autorisé
        }
        $task = Task::findOrFail($taskId); // Récupère la tâche ou renvoie une erreur 404
        // Vérifie si la tâche appartient au projet
        if ($task->project_id !== $projects->id) {
            abort(403, 'Unauthorized'); // Renvoie une erreur 403 si non autorisé
        }
        return view('tasks/show', [
            'task' => $task,
            'projects' => $projects
        ]);
    }

    public function create($id) : View
    {
        $permissions = $this->hasPermission($id);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        if (!$permissions->contains('task_manage')) {
            abort(403, 'Permission denied');
        }

        $project = Project::findOrFail($id);
        $users = $project->users;

        return view('tasks/create', [
            'project_id' => $id,
            'users' => $users // Passe les utilisateurs à la vue
        ]);
    }

    public function store($id)
    {
        $permissions = $this->hasPermission($id);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        if (!$permissions->contains('task_manage')) {
            abort(403, 'Permission denied');
        }

        // Vérifie si le projet existe
        $project = Project::findOrFail($id);

        $validatedData = request()->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'priority' => 'required',
            'status' => 'required|string',
            'project_id' => 'required|exists:projects,id',
            'user_ids' => 'array',
            'user_ids.*' => 'exists:users,id',
            'role_ids' => 'array',
            'role_ids.*' => 'exists:roles,id',
        ]);

        $validatedData['type'] = $validatedData['type'] ?? 'task';

        // Ajoute les valeurs dynamiques qui ne sont pas dans la requête
        $validatedData['created_by'] = Auth::id();

        // Création de la tâche avec toutes les valeurs nécessaires
        $task = Task::create($validatedData);

        // Vérifie si un utilisateur a été sélectionné avant d'attacher
        if (!empty($validatedData['user_ids']) && $validatedData['user_ids']!=='no user found') {
            $task->assignees()->attach($validatedData['user_ids']);
        }

        if (!empty($validatedData['role_ids']) && $validatedData['role_ids']!=='no roles found') {
            $task->roles()->attach($validatedData['role_ids']);
        }
    }

    public function edit($projectId, $taskId)
    {
        $permissions = $this->hasPermission($projectId);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        if (!$permissions->contains('task_manage')) {
            abort(403, 'Permission denied');
        }

        $user = Auth::user();
        $project = Project::findOrFail($projectId);
        $users = $project->users;
        $task = Task::findOrFail($taskId);

        // Vérifie si l'utilisateur connecté est associé au projet
        if (!$project->users->contains($user)) {
            abort(403, 'Unauthorized'); // Renvoie une erreur 403 si non autorisé
        }

        // Vérifie si la tâche appartient au projet
        if ($task->project_id !== $project->id) {
            abort(403, 'Unauthorized'); // Renvoie une erreur 403 si non autorisé
        }

        return view('tasks/edit', [
            'users' => $users,
            'task' => $task,
            'projects' => $project
        ]);
    }

    public function update($projectId, $taskId)
    {
        $permissions = $this->hasPermission($projectId);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        if (!$permissions->contains('task_manage')) {
            abort(403, 'Permission denied');
        }

        $user = Auth::user();
        $project = Project::findOrFail($projectId);
        $task = Task::findOrFail($taskId);

        // Vérifie si l'utilisateur connecté est associé au projet
        if (!$project->users->contains($user)) {
            abort(403, 'Unauthorized'); // Renvoie une erreur 403 si non autorisé
        }

        // Vérifie si la tâche appartient au projet
        if ($task->project_id !== $project->id) {
            abort(403, 'Unauthorized'); // Renvoie une erreur 403 si non autorisé
        }

        $validatedData = request()->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'priority' => 'required',
            'status' => 'required|string',
            'user_id' => 'nullable'
        ]);

        // Met à jour la tâche avec les nouvelles valeurs
        $task->update($validatedData);

        // Vérifie si un utilisateur a été sélectionné avant d'attacher
        if (!empty($validatedData['user_id']) && $validatedData['user_id']!=='no user found') {
            $task->assignees()->sync([$validatedData['user_id']]);
        }

    }

    public function destroy($projectId, $taskId)
    {
        $permissions = $this->hasPermission($projectId);

        // Vérifie que l'utilisateur est autoriser à accéder au projet
        if (!$permissions->contains('task_manage')) {
            abort(403, 'Permission denied');
        }

        $user = Auth::user();

        // Vérifie si le projet existe et si l'utilisateur y est associé
        $project = Project::findOrFail($projectId);
        if (!$project->users->contains($user)) {
            abort(403, 'Unauthorized');
        }

        // Vérifie si la tâche appartient au projet
        $task = Task::findOrFail($taskId);
        if ($task->project_id !== $project->id) {
            abort(403, 'Unauthorized');
        }

        // Supprime la tâche
        $task->delete();

        return redirect()->route('project', $projectId)->with('success', 'Task deleted successfully.');
    }

}
