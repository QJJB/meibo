<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectRole extends Model
{
    use HasFactory;

    protected $table = 'project_roles';

    protected $fillable = ['project_members_id', 'role_id'];

    // Désactiver la gestion des timestamps
    public $timestamps = false;

    public function projectMember()
    {
        return $this->belongsTo(ProjectMember::class, 'project_members_id');
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}

