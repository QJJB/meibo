<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;
use App\Models\Role;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 🔹 Créer 3 projets
        $projects = Project::factory()->count(3)->create();

        // 🔹 Pour chaque projet, créer 3 utilisateurs et les associer
        $projects->each(function ($project) {
            $users = User::factory()->count(3)->create();
            // Attacher les utilisateurs au projet via la table pivot
            $project->users()->attach($users->pluck('id')->toArray());
        });

        // 🔹 Pour chaque projet, créer 3 tâches et les associer au projet
        $projects->each(function ($project) {
            $tasks = Task::factory()->count(3)->create();

            // Associer chaque tâche à un projet en définissant 'project_id'
            $tasks->each(function ($task) use ($project) {
                $task->project_id = $project->id;
                $task->save();
            });
        });
    }
}
