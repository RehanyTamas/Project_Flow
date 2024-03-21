<?php

namespace App\Http\Controllers;

use App\Models\Task;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function getUserTasks(Request $request){

        $user = Auth::user();

        $tasks = Task::where('userID', $user->id)->with('project:name') ->get();

        return response()->json($tasks);
    }
}
