<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Illuminate\Http\Request;
use App\Http\Controllers\TaskController;
use App\Http\Requests\UpdateTaskStatusRequest;

class TaskControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function test_getUserTasks()
    {
        $user = User::create([
        'name' => 'TestUser' . rand(1000, 9999),
        'email' => 'email' . rand(1000, 9999) . '@example.com',
        'password' => Hash::make('password' . rand(1000, 9999)),
        'company' => 'Company' . rand(1000, 9999),
    ]);

        Auth::login($user);

        $project = Project::create([
            'name' => 'TestProject' . rand(1000, 9999),
            'company' => $user->company,
            'creatorID' => $user->id,
            'description' => 'Description' . rand(1000,9999),
            'deadline' => now()->addDays(7),
        ]);

        Task::create([
            'name' => 'Test Task 1',
            'description' => 'Task 1 Description',
            'deadline' => now()->addDays(7),
            'status' => 'Not yet started',
            'projectID' => $project->id,
            'userID' => $user->id,
            'company' => $user->company,
        ]);

        Task::create([
            'name' => 'Test Task 2',
            'description' => 'Task 2 Description',
            'deadline' => now()->addDays(8),
            'status' => 'Not yet started',
            'projectID' => $project->id,
            'userID' => $user->id,
            'company' => $user->company,
        ]);

        $controller = new TaskController();
        $response = $controller->getUserTasks(new Request());

        $tasks = $response->getData();
        $this->assertCount(2, $tasks);
        $this->assertEquals('Test Task 1', $tasks[0]->name);
        $this->assertEquals('Test Task 2', $tasks[1]->name);
    }

    public function test_updateTaskStatus()
    {
        $user = User::create([
            'name' => 'TestUser' . rand(1000, 9999),
            'email' => 'email' . rand(1000, 9999) . '@example.com',
            'password' => Hash::make('password' . rand(1000, 9999)),
            'company' => 'Company' . rand(1000, 9999),
        ]);

        Auth::login($user);

        $project = Project::create([
            'name' => 'TestProject' . rand(1000, 9999),
            'company' => $user->company,
            'creatorID' => $user->id,
            'description' => 'Description' . rand(1000,9999),
            'deadline' => now()->addDays(7),
        ]);

        $task = Task::create([
            'name' => 'Test Task 1',
            'description' => 'Task 1 Description',
            'deadline' => now()->addDays(7),
            'status' => 'Not yet started',
            'projectID' => $project->id,
            'userID' => $user->id,
            'company' => $user->company,
        ]);

        $request = new UpdateTaskStatusRequest([
            'status' => 'Complete',
        ]);

        $controller = new TaskController();
        $response = $controller->updateTaskStatus($request, $task->id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Task status updated successfully', json_decode($response->getContent())->message);

        $updatedTask = Task::find($task->id);
        $this->assertEquals('Complete', $updatedTask->status);
    }
}
