<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DeassignTask extends Mailable
{
    use Queueable, SerializesModels;

    private $projectName;
    private $taskName;

    /**
     * Create a new message instance.
     */
    public function __construct($projectName,$taskName)
    {
        $this->projectName = $projectName;
        $this->taskName = $taskName;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Deassign Task',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'deassignedFromTaskMail',
            with: [
                'projectName' => $this->projectName,
                'taskName' => $this->taskName,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
