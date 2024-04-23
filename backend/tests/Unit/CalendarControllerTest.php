<?php

namespace Tests\Unit;

use App\Models\TeamMembers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use App\Http\Controllers\CalendarController;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;

class CalendarControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function test_getDeadlines()
    {
        $uniqueEmail = 'unique' . rand(1000, 9999) . '@example.com';
        $uniqueUsername = 'User' . rand(1000, 9999);
        $uniquePassword = 'ABC' . rand(1000, 9999);
        $uniqueCompany = 'Company' . rand(1000, 9999);

        $user = User::create([
            'name' => $uniqueUsername,
            'email' => $uniqueEmail,
            'company' => $uniqueCompany,
            'password' => Hash::make($uniquePassword),
        ]);

        Auth::login($user);

        $teamMemberProject = new Project();
        $teamMemberProject->name = 'Team Member Project';
        $teamMemberProject->description = 'Team Member Description';
        $teamMemberProject->company = $uniqueCompany;
        $teamMemberProject->creatorID = $user->id;
        $teamMemberProject->deadline = now()->addDays(7);
        $teamMemberProject->save();

        TeamMembers::create([
            'projectID' => $teamMemberProject->id,
            'userID' => $user->id,
        ]);

        $creatorProject = new Project();
        $creatorProject->name = 'Creator Project';
        $creatorProject->description = 'Creator Description';
        $creatorProject->company = $uniqueCompany;
        $creatorProject->creatorID = $user->id;
        $creatorProject->deadline = now()->addDays(14);
        $creatorProject->save();

        $userTask = new Task();
        $userTask->name = 'User Task';
        $userTask->userID = $user->id;
        $userTask->company = $uniqueCompany;
        $userTask->description = 'Task Description';
        $userTask->deadline = now()->addDays(7);
        $userTask->projectID = $teamMemberProject->id;
        $userTask->status = 'Not yet started';
        $userTask->save();

        $calendarController = new CalendarController();
        $response = $calendarController->getDeadlines();

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);

        $this->assertCount(2, $data['projects']);
        $this->assertCount(1, $data['tasks']);

        $this->assertTrue(
            collect($data['projects'])->pluck('id')->contains($teamMemberProject->id) &&
            collect($data['projects'])->pluck('id')->contains($creatorProject->id)
        );

        $this->assertTrue(
            collect($data['tasks'])->pluck('id')->contains($userTask->id)
        );
    }
}
