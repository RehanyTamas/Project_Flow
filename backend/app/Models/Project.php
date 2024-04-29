<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'company',
        'description',
        'deadline',
        'creatorID'
    ];

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'project_id'); // 'project_id' is the foreign key in 'comments'
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creatorID');
    }

    public function teamMembers(): HasMany
    {
        return $this->hasMany(TeamMembers::class, 'projectID');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'projectID');
    }


}
