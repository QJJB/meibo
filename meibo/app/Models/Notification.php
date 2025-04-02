<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ['message'];

    /**
     * Relation avec les utilisateurs à travers task_notifications.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'task_notifications')
            ->withPivot('task_id', 'is_read')
            ->withTimestamps();
    }

    /**
     * Relation avec les tâches à travers task_notifications.
     */
    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'task_notifications')
            ->withPivot('user_id', 'is_read')
            ->withTimestamps();
    }
}
