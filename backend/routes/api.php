<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\BackgroundImageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function(){
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('my-tasks', [TaskController::class, 'getUserTasks']);
    Route::get('my-projects', [ProjectController::class, 'getUserProjects']);
    Route::get('my-projects/{id}', [ProjectController::class, 'getDetails']);
    Route::delete('my-projects/{id}', [ProjectController::class, 'deleteProject']);
    Route::put('my-projects/{id}', [ProjectController::class, 'updateProject']);
    Route::get('users', [UsersController::class, 'getUsers']);
    Route::post('new-project', [ProjectController::class, 'addProject']);
    Route::put('my-tasks/{id}', [TaskController::class, 'updateTaskStatus']);
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('images', [BackgroundImageController::class, 'getImages']);
