<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTaskStatusRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
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

        return response()->json(['message' => 'Task status updated successfully'], 200);
    }
}
