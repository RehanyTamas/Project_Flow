<?php

namespace App\Services;

use App\Models\Notification;

class NotificationService
{
    public function personAddedToTeamMembers($userId, $projectId)
    {
        $this->createNotification($userId, 'teammember_assignment', $projectId);
    }

    public function personRemovedFromTeamMembers($userId, $projectId)
    {
        $this->createNotification($userId, 'teammember_deassignment', $projectId);
    }

    public function personAssignedToTask($userId, $taskId, $projectId)
    {
        $this->createNotification($userId, 'task_assignment', $projectId, $taskId);
    }

    public function personDeassignedFromTask($userId, $taskId, $projectId)
    {
        $this->createNotification($userId, 'task_deassignment', $projectId, $taskId);
    }

    public function taskStatusChanged($userId, $taskId, $projectId)
    {
        $this->createNotification($userId, 'task_status_change', $projectId, $taskId);
    }

    private function createNotification($userId, $action, $projectId = null, $taskId = null)
    {
        Notification::create([
            'user_id' => $userId,
            'action' => $action,
            'project_id' => $projectId,
            'task_id' => $taskId,
        ]);
    }
}
