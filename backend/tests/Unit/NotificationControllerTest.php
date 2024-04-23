<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Project;
use App\Models\Notification;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Illuminate\Http\Request;
use App\Http\Controllers\NotificationController;

class NotificationControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function createTestUser()
    {
        return User::create([
            'name' => 'User' . rand(1000, 9999),
            'email' => 'email' . rand(1000, 9999) . '@example.com',
            'company' => 'Company' . rand(1000, 9999),
            'password' => Hash::make('password' . rand(1000, 9999)),
        ]);
    }

    public function test_getUserNotifications()
    {
        $user = $this->createTestUser();
        Auth::login($user);

        $project = new Project();
        $project->name = 'Creator Project';
        $project->description = 'Creator Description';
        $project->company = 'Company' . rand(1000, 9999);
        $project->creatorID = $user->id;
        $project->deadline = now()->addDays(14);
        $project->save();

        Notification::create(['project_id' => $project->id, 'user_id' => $user->id, 'content' => 'Notification 1','action' => "teammember_assignment"]);
        Notification::create(['project_id' => $project->id, 'user_id' => $user->id, 'content' => 'Notification 2','action' => "teammember_assignment"]);

        $controller = new NotificationController();
        $response = $controller->getUserNotifications(new Request());

        $this->assertEquals(2, count($response->toArray()));
    }

    public function test_deleteNotification()
    {
        $user = $this->createTestUser();
        Auth::login($user);

        $project = new Project();
        $project->name = 'Creator Project';
        $project->description = 'Creator Description';
        $project->company = 'Company' . rand(1000, 9999);
        $project->creatorID = $user->id;
        $project->deadline = now()->addDays(14);
        $project->save();

        $notification = Notification::create(['project_id' => $project->id, 'user_id' => $user->id, 'content' => 'Notification to delete','action' => "teammember_assignment"]);

        $controller = new NotificationController();
        $response = $controller->deleteNotification($notification->id);

        $content = json_decode($response->getContent(), true);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Notification deleted successfully', $content['message']);
    }

    public function test_deleteNonExistentNotification()
    {
        $user = $this->createTestUser();
        Auth::login($user);

        $controller = new NotificationController();
        $response = $controller->deleteNotification(999);

        $content = json_decode($response->getContent(), true);
        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Notification not found', $content['error']);
    }
}
