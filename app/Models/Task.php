<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'tasks';

    protected $fillable = ['title', 'type', 'description', 'project_id', 'due_date', 'priority', 'status'];

    public function projects() {
        return $this->belongsTo(Project::class);
    }

    public function creator() {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function assignees(){
        return $this->belongsToMany(User::class, 'task_assignees');
    }

    public function roles(){
        return $this->belongsToMany(Role::class, 'task_roles');
    }
}
