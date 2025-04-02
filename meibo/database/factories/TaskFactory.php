<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'type' => $this->faker->word(),
            'description' => $this->faker->paragraph(),
            'priority' => $this->faker->numberBetween(1, 5),
            'status' => 'pending',
            'project_id' => Project::factory(), // Crée un projet si nécessaire
            'created_by' => User::factory(), // Crée un utilisateur si nécessaire
            'due_date' => now()->addDays(rand(1, 30)),
        ];
    }
}
