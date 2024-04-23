<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{
    public function getDeadlines()
    {

        $user = Auth::user();

        $teamMemberProjects = Project::whereHas('teamMembers', function ($query) use ($user) {
            $query->where('userID', $user->id);
        })->select('id', 'name', 'deadline')->get();

        $creatorProjects = Project::where('creatorID', $user->id)->select('id', 'name', 'deadline')->get();

        $userTasks = Task::where('userID', $user->id)->with('project:id,name')->get();

        $response = [
            'projects' => $teamMemberProjects->merge($creatorProjects),
            'tasks' => $userTasks,
        ];

        return response()->json($response);
    }
}

