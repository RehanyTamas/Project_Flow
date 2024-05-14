import React, { useState } from 'react';
import axios from 'axios';
import Comment from './Comment';
import AppConfig from "../../config"; // Import the Comment component

// Component to display and manage comments for a specific project
const CommentSection = ({token, projectId, initialComments = [] }) => {
    const [comments, setComments] = useState(initialComments); // State for comments
    const [newComment, setNewComment] = useState(''); // State for new comment content
    const [parentCommentId, setParentCommentId] = useState(null); // For replies

    const handleAddComment = (event) => {
        event.preventDefault();

        if (newComment.trim() === '') {
            return; // Don't submit empty comments
        }

        try {
            let $commentData = {
                project_id: projectId,
                text: newComment,
                parent_id: parentCommentId, // For replying to a specific comment
            };

            axios.post(`${AppConfig.backendUrl}/api/add-comment`, $commentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(response => {
                    setComments([...comments, response.data]); // Add the new comment to state
                    setNewComment(''); // Clear the input field
                    setParentCommentId(null); // Reset parent ID after submission
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500)
                })
                .finally(() => {
                });
        } catch (error) {
            console.error("Error adding new comment", error);
            return [];
        }
        const data = {
            project_id: projectId,
            content: newComment,
            parent_id: parentCommentId, // For replying to a specific comment
        };

    };

    const handleReplyToComment = (parentId) => {
        setParentCommentId(parentId); // Set the parent ID for replying
    };

    return (
        <div className="space-y-4 border-white border-b-2">
            {comments.length === 0 ? (
                <div className="text-gray-500">No comments yet. Be the first to comment!</div> // Message when no comments
            ) : (
                comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        projectId ={projectId}
                        token={token}
                        onReply={() => handleReplyToComment(comment.id)} // Handle reply
                    /> // Render each top-level comment
                ))
            )}

            <div className="mt-4">
                <input
                    className="w-full border rounded-lg p-2 bg-custom-dark text-white"
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment} // Bind to new comment state
                    onChange={(e) => setNewComment(e.target.value)} // Update state on change
                />
                <button
                    className="mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    onClick={handleAddComment}
                >
                    Submit Comment
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
