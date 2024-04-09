<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProjectRequest;
use App\Models\Project;
use App\Models\Task;
use App\Models\TeamMembers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function getUserProjects(Request $request){

        $user = Auth::user();
        $projects = Project::where('creatorID', $user->id)->select('id', 'name', 'deadline')->get();

        return response()->json($projects);
    }

    public function getDetails($id){

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
                    'id' => $teamMember->userID,
                    'name' => $teamMember->user->name,
                ];
            }),
            'tasks' => $project->tasks->map(function ($task) {
                return [
                    'id' => $task->id,
                    'name' => $task->name,
                    'deadline' => $task->deadline,
                    'description' => $task->description,
                    'assignedTo' => $task->user->id,
                    'assignedToName' => $task->user->name,
                    'status' => $task->status,
                ];
            }),
        ];

        return response()->json($response);
    }

    public function addProject(CreateProjectRequest $request){

        $user = Auth::user();

        $project = Project::create([
            'name' => $request->name,
            'company' => $user->company,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'creatorID' => $user->id, // Assuming the currently authenticated user is the creator
        ]);

        if($request->has('teamMembers')){
            foreach ($request->teamMembers as $teamMember) {
                TeamMembers::create([
                    'userID' => $teamMember['id'],
                    'projectID' => $project->id,
                ]);
            }
        }

        if ($request->has('tasks')) {
            foreach ($request->tasks as $taskData) {
                Task::create([
                    'name' => $taskData['name'],
                    'company' => $user->company,
                    'description' => $taskData['description'],
                    'deadline' => $taskData['deadline'],
                    'status' => $taskData['status'],
                    'projectID' => $project->id,
                    'userID' => $taskData['assignedTo'], // Assuming each task has an assigned user ID
                ]);
            }
        }

        return response()->json(['message' => 'Project created successfully', 'project' => $project], 201);
    }

    public function deleteProject($id){

        $user = Auth::user();

        $project = Project::where('id',$id)
            ->where('creatorID', $user->id)
            ->first();

        if(!$project){
            return response()->json(['error' => 'Project not found'], 404);
        }

        Task::where('projectID',$project->id)->delete();

        TeamMembers::where('projectID',$project->id)->delete();

        $project->delete();

        return response()->json(['message' => 'Project deleted successfully'], 200);
    }

    public function updateProject(CreateProjectRequest $request,$id){

        $user = Auth::user();

        $project = Project::where('id', $id)
            ->where('creatorID', $user->id)
            ->first();

        if (!$project) {
            return response()->json(['error' => 'Project not found'], 404);
        }
        if($request->name )
        $project->update([
            'name' => $request->name,
        ]);

        if($request->description)
        $project->update([
            'description' => $request->description,
        ]);

        if($request->deadline )
        $project->update([
            'deadline' => $request->deadline,
        ]);
        TeamMembers::where('projectID', $project->id)->delete();
        if($request->team_members){
            foreach ($request->team_members as $teamMember) {
                TeamMembers::create([
                    'userID' => $teamMember['id'],
                    'projectID' => $project->id,
                ]);
            }
        }
        Task::where('projectID', $project->id)->delete();
        if($request->tasks){
            foreach ($request->tasks as $taskData) {
                Task::create([
                    'name' => $taskData['name'],
                    'company' => $user->company,
                    'description' => $taskData['description'],
                    'deadline' => $taskData['deadline'],
                    'status' => $taskData['status'],
                    'projectID' => $project->id,
                    'userID' => $taskData['assignedTo'], // Assuming each task has an assigned user ID
                ]);
            }
        }


        return response()->json(['message' => 'Project updated successfully', 'project' => $project], 200);
    }

}
