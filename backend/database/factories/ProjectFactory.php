<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'description' => $this->faker->paragraph(),
            'start_date' => now(),
            'end_date' => now()->addDays(rand(10, 100)),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Project $project) {
            $users = \App\Models\User::factory()->count(3)->create();
            $project->users()->attach($users);
        });
    }

}
