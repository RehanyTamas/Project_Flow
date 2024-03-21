<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function getUserProjects(Request $request){

        $user = Auth::user();
        $projects = Project::where('creatorID', $user->id)->select('id', 'name', 'deadline')->get();

        return response()->json($projects);
    }

    public function getDetails(int $id){

        $user = Auth::user();

        $project = Project::with('teamMembers.user', 'tasks', 'creator')
            ->where('id', $id)
            ->where('creatorID', $user->id)
            ->first();

        if (!$project) {
            return response()->json(['error' => 'Project not found'], 404);
        }

        $response = [
            'id' => $project->id,
            'name' => $project->name,
            'description' => $project->description,
            'deadline' => $project->deadline,
            'creator' =>  $project->creator->name,
            'team_members' => $project->teamMembers->map(function ($teamMember) {
                return [
                    'id' => $teamMember->id,
                    'name' => $teamMember->name,
                ];
            }),
            'tasks' => $project->tasks->map(function ($task) {
                return [
                    'id' => $task->id,
                    'name' => $task->name,
                    'description' => $task->description,
                    'assigned_to' => $task->user->name,
                    'status' => $task->status,
                ];
            }),
        ];

        return response()->json($response);
    }

}
