<?php

namespace App\Services;

use App\Models\Notification;

class NotificationService
{
    public function personAddedToTeamMembers($userId, $projectId)
    {
        $this->createNotification($userId, 'Added to Team Members', $projectId);
    }

    public function personRemovedFromTeamMembers($userId, $projectId)
    {
        $this->createNotification($userId, 'Removed from Team Members', $projectId);
    }

    public function personAssignedToTask($userId, $taskId, $projectId)
    {
        $this->createNotification($userId, 'Assigned to Task', $projectId, $taskId);
    }

    public function personDeassignedFromTask($userId, $taskId, $projectId)
    {
        $this->createNotification($userId, 'Deassigned from Task', $projectId, $taskId);
    }

    public function taskStatusChanged($userId, $taskId, $projectId)
    {
        $this->createNotification($userId, 'Task Status Changed', $projectId, $taskId);
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
