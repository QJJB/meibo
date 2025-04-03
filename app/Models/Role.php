<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table = 'roles';

    protected $fillable = ['name'];

    public $timestamps = false;

    public function projects() {
        return $this->belongsToMany(Project::class, 'project_roles');
    }

    public function users(){
        return $this->belongsToMany(User::class, 'project_members', 'role_id', 'user_id');
    }

    public function permissions(){
        return $this->belongsToMany(Permission::class, 'role_permissions');
    }

    public function projectMembers()
    {
        return $this->hasMany(ProjectRole::class, 'role_id');
    }

}
