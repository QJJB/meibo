<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectMember extends Model
{
    public $timestamps = false;

    protected $fillable = ['user_id', 'project_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'project_roles', 'project_members_id', 'role_id');
    }
}
