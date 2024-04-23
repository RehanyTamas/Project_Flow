<?php

namespace Tests\Unit;

use App\Http\Requests\CreateProjectRequest;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use App\Models\TeamMembers;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Tests\TestCase;
use App\Http\Controllers\ProjectController;

class ProjectControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function createTestUser()
    {
        return User::create([
            'name' => 'TestUser' . rand(1000, 9999),
            'email' => 'email' . rand(1000, 9999) . '@example.com',
            'password' => Hash::make('password' . rand(1000, 9999)),
            'company' => 'Company' . rand(1000, 9999),
        ]);
    }

    public function createTestProject($user)
    {
        return Project::create([
            'name' => 'TestProject' . rand(1000, 9999),
            'company' => $user->company,
            'creatorID' => $user->id,
            'description' => 'Description' . rand(1000,9999),
            'deadline' => now()->addDays(7),
        ]);
    }

    public function test_getUserProjects()
    {
        $user = $this->createTestUser();
        Auth::login($user);

        $project1 = $this->createTestProject($user);
        $project2 = $this->createTestProject($user);

        $controller = new ProjectController();
        $response = $controller->getUserProjects(new Request());

        $this->assertEquals(200, $response->getStatusCode());
        $projects = json_decode($response->getContent(), true);
        $this->assertCount(2, $projects);
    }

    public function test_getProjectDetails()
    {
        $user = $this->createTestUser();
        Auth::login($user);

        $project = $this->createTestProject($user);
        TeamMembers::create(['userID' => $user->id, 'projectID' => $project->id]);
        Task::create(['status' => 'Not yet started','company' => $project->company ,'deadline' => '2024-12-31','description' => 'description','name' => 'TestTask', 'projectID' => $project->id, 'userID' => $user->id]);

        $controller = new ProjectController();
        $response = $controller->getDetails($project->id);

        $this->assertEquals(200, $response->getStatusCode());
        $details = json_decode($response->getContent(), true);
        $this->assertEquals($project->id, $details['id']);
        $this->assertCount(1, $details['team_members']);
        $this->assertCount(1, $details['tasks']);
    }

    public function test_addProject()
    {
        $user = $this->createTestUser();
        Auth::login($user);

        $request = new CreateProjectRequest([
            'name' => 'NewProject',
            'description' => 'A test project',
            'deadline' => '2024-12-31',
            'tasks' => [
                ['name' => 'Task 1', 'description' => 'Task description', 'deadline' => '2024-12-15', 'status' => 'open', 'assignedTo' => $user->id],
            ],
            'teamMembers' => [
                ['id' => $user->id],
            ],
        ]);

        $controller = new ProjectController();
        $response = $controller->addProject($request);

        $this->assertEquals(201, $response->getStatusCode());
        $content = json_decode($response->getContent(), true);
        $this->assertEquals('Project created successfully', $content['message']);
    }

    public function test_deleteProject()
    {
        $user = $this->createTestUser();
        Auth::login($user);

        $project = $this->createTestProject($user);

        $controller = new ProjectController();
        $response = $controller->deleteProject($project->id);

        $this->assertEquals(200, $response->getStatusCode());
        $content = json_decode($response->getContent(), true);
        $this->assertEquals('Project deleted successfully', $content['message']);
    }

    public function test_updateProject()
    {
        $user = $this->createTestUser();
        Auth::login($user);

        $project = $this->createTestProject($user);

        $request = new CreateProjectRequest([
            'name' => 'Updated Project',
            'description' => 'Updated description',
            'deadline' => '2024-12-31',
            'team_members' => [
                ['id' => $user->id],
            ],
            'tasks' => [
                ['name' => 'Updated Task', 'description' => 'Updated Task description', 'deadline' => '2024-12-31', 'status' => 'open', 'assignedTo' => $user->id],
            ],
        ]);

        $controller = new ProjectController();
        $response = $controller->updateProject($request, $project->id);

        $this->assertEquals(200, $response->getStatusCode());
        $content = json_decode($response->getContent(), true);
        $this->assertEquals('Project updated successfully', $content['message']);
    }
}
