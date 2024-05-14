import React, { useState } from 'react';
import classNames from 'classnames';
import axios from "axios";
import AppConfig from "../../config"; // Utility to conditionally apply classes

// Component to display a single comment and optionally foldable replies
const Comment = ({token, comment,projectId }) => {
    const [showReplies, setShowReplies] = useState(false); // State to control visibility of replies
    const [showReplyInput, setShowReplyInput] = useState(false); // Control visibility of the reply input
    const [replyText, setReplyText] = useState(''); // State for reply text

    const toggleReplies = () => {
        setShowReplies((prev) => !prev); // Toggle the visibility of replies
    };

    const toggleReplyInput = () => {
        setShowReplyInput(!showReplyInput); // Toggle the visibility of the reply input
        if (!showReplyInput) {
            setReplyText(''); // Clear the reply text when opening the input
        }
    };

    const isTopComment = comment.parent_id === null; // Check if it's a top-level comment
    const submitReply = (event) => {
        event.preventDefault();

        if (replyText.trim() === '') {
            return; // Don't submit empty comments
        }

        try {
            let $replyData = {
                project_id: projectId,
                text: replyText,
                parent_id:(comment.parent_id) ?  comment.parent_id : comment.id, // For replying to a specific comment
            };

            axios.post(`${AppConfig.backendUrl}/api/add-comment`, $replyData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(response => {
                    setShowReplyInput(false);
                    setReplyText('');
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
    };

    return (
        <div className="border rounded-lg mb-4 bg-indigo-950 shadow-sm border-white border-b-2">
            <div className="flex justify-between items-center text-white font-bold">
                <div className="flex items-center">
                    <span className="ml-4 font-semibold text-2xl">{comment.user.name}</span>
                </div>

                {(comment.parent_id === null) && (
                    <button
                        className="text-white hover:text-gray-700 "
                        onClick={toggleReplies}
                    >
                        {showReplies ? (
                            <p className={"text-white"}>Hide</p> // Icon to fold replies
                        ) : (
                            <p>Show</p> // Icon to unfold replies
                        )}
                    </button>
                )}
            </div>
            <div className={"text-white font-semibold ml-10"}>{comment.text}</div>

            {/* Reply Button */}
            {(<button
                className={"pl-5 text-lg font-bold text-white hover:text-blue-800"}
                onClick={toggleReplyInput} // Toggle the reply input field
            >
                Reply
            </button>)}

            {showReplyInput && (
                <div className="mt-2">
                    <input
                        className="w-full border rounded-lg p-2 bg-custom-dark text-white"
                        type="text"
                        placeholder="Type your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)} // Update reply text
                    />
                    <button
                        className="mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        onClick={submitReply}
                    >
                        Submit
                    </button>
                </div>
            )}

            {showReplies && comment.replies && (
                <div
                    className={classNames(
                        'mt-4 ml-4 border-l-2 border-gray-200 pl-4',
                        !showReplies && 'hidden' // Hide replies when folded
                    )}
                >
                    {comment.replies.map((reply) => (
                        <Comment key={reply.id}
                                 comment={reply}
                                 projectId ={projectId}
                                 token={token}/> // Recursive rendering for replies
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
