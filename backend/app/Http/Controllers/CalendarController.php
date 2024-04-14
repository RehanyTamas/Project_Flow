<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{
    public function getDeadlines()
    {

        $user = Auth::user();

        // Retrieve all projects where the user is a team member
        $teamMemberProjects = Project::whereHas('teamMembers', function ($query) use ($user) {
            $query->where('userID', $user->id);
        })->select('id', 'name', 'deadline')->get();

        $creatorProjects = Project::where('creatorID', $user->id)->select('id', 'name', 'deadline')->get();

        // Retrieve all tasks assigned to the user
        $userTasks = Task::where('userID', $user->id)->with('project:id,name')->get();

        $response = [
            'projects' => $teamMemberProjects->merge($creatorProjects),
            'tasks' => $userTasks,
        ];

        return response()->json($response);
    }
}

