<?php

namespace App\Services;

use App\Mail\AddToTeam;
use App\Mail\AssignTask;
use App\Mail\DeassignTask;
use App\Mail\RemoveFromTeam;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class EmailService
{
    public static function sendAddedToTeamEmail($userID, $projectID){

        $recipient = User::find($userID);

        $projectName = Project::find($projectID)->name;

        Mail::to($recipient->email)->send(new AddToTeam($projectName));

        return "Success";
    }

    public static function sendRemovedFromTeamEmail($userID, $projectID){

        $recipient = User::find($userID);

        $projectName = Project::find($projectID)->name;

        Mail::to($recipient->email)->send(new RemoveFromTeam($projectName));

        return "Success";
    }

    public static function sendAssignedToTaskEmail($userID,$taskID, $projectID){

        $recipient = User::find($userID);

        $projectName = Project::find($projectID)->name;

        $taskName = Task::find($taskID)->name;


        Mail::to($recipient->email)->send(new AssignTask($projectName,$taskName));

        return "Success";
    }

    public static function sendDeassignedFromTaskEmail($userID,$taskID, $projectID){

        $recipient = User::find($userID);

        $projectName = Project::find($projectID)->name;

        $taskName = Task::find($taskID)->name;


        Mail::to($recipient->email)->send(new DeassignTask($projectName,$taskName));

        return "Success";
    }

}
