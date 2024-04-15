<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTaskStatusRequest;
use App\Models\Task;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    protected $notificationService;

    public function __construct()
    {
        $this->notificationService = new NotificationService();
    }
    public function getUserTasks(Request $request){

        $user = Auth::user();

        $tasks = Task::where('userID', $user->id)->with('project')->get();

        return response()->json($tasks);
    }

    public function updateTaskStatus(UpdateTaskStatusRequest $request, $id){

        $user = Auth::user();

        $task = Task::where('id', $id)
            ->where('userID', $user->id)
            ->first();

        $task->status = $request->status;
        $task->save();

        $this->notificationService->taskStatusChanged($task->project->creatorID, $task->id, $task->projectID);

        return response()->json(['message' => 'Task status updated successfully'], 200);
    }
}
