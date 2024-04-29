<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of comments for a specific project.
     */
    public function getProjectComments($projectId)
    {
        $comments = Comment::where('project_id', $projectId)
            ->with('replies')
            ->get();

        return response()->json($comments);
    }

    /**
     * Store a newly created comment.
     */
    public function addComment(CommentRequest $request)
    {
        $user = Auth::user();

        $comment = Comment::create([
            'user_id' => $user->id,
            'project_id' => $request->project_id,
            'parent_id' => $request->parent_id,
            'text' => $request->text,
        ]);

        return response()->json($comment, 201);
    }

    /**
     * Display the specified comment.
     */
    public function getComment($id)
    {
        $comment = Comment::findOrFail($id);

        return response()->json($comment);
    }

    /**
     * Update the specified comment.
     */
    public function updateComment(CommentRequest $request, $id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $comment->update([
            'content' => $request->text,
        ]);

        return response()->json($comment);
    }

    /**
     * Remove the specified comment.
     */
    public function deleteComment($id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
