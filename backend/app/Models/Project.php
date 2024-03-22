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

    public function creator(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'creatorID');
    }

    public function teamMemberships(): HasMany
    {
        return $this->hasMany(TeamMembers::class, 'projectID');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'projectID');
    }


}
