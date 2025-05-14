<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $table = 'projects';

    protected $fillable = ['name', 'description', 'start_date', 'end_date', 'is_favorite', 'creator_id'];

    public function tasks() {
        return $this->hasMany(Task::class);
    }

    public function users(){
        return $this->belongsToMany(User::class, 'project_members');
    }

    public function members()
    {
        return $this->hasMany(ProjectMember::class);
    }

    public function roles(){
        return $this->hasMany(Role::class, 'project_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
}
