<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_photo',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function tasks(){
        return $this->belongsToMany(Task::class, 'task_assignees');
    }

    public function projects(){
        return $this->belongsToMany(Project::class, 'project_members')
                        ->withPivot('user_id');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'project_members', 'user_id', 'role_id');
    }

    //modif 07-04-25
    public function projectMembers()
    {
        return $this->hasMany(ProjectMember::class);
    }

}
