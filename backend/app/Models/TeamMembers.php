<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeamMembers extends Model
{
    use HasFactory;

    protected $fillable = [
        'projectID',
        'userID'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userID');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'projectID');
    }
}
