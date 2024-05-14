import React, { useState } from 'react';

const TaskPopUp = ({ teamMembers, setTasks, onClose }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState('Not yet started');

    const statuses = ['Not yet started', 'WIP', 'Stuck', 'Complete'];

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted');
        // Create a new task object
        const newTask = {
            name: taskName,
            description: taskDescription,
            deadline: taskDeadline,
            assignedTo: assignedTo,
            status: status
        };
        // Add the new task to the tasks list
        setTasks(prevTasks => [...prevTasks, newTask]);
        // Clear the form fields
        setTaskName('');
        setTaskDescription('');
        setTaskDeadline('');
        setAssignedTo('');
        setStatus('Not yet started');
        // Close the popup
        onClose();
    };
    const close = (event) => {
        onClose();
    }

    return (
        <div className="bg-custom-dark flex flex-col">
                <div className="bg-custom-dark px-6 py-8 rounded shadow-md text-white font-bold w-full">
                    <h1 className="mb-8 text-3xl text-center">New Task</h1>
                    <input
                        className="block border border-white w-full p-3 rounded mb-4 text-white bg-indigo-950"
                        placeholder="Name"
                        id="taskName"
                        name="taskName"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                    <input
                        className="block border border-white w-full p-3 rounded mb-4 text-white bg-indigo-950"
                        placeholder="Description"
                        id="taskDescription"
                        name="taskDescription"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        required
                    />
                    <input
                        className="block border border-white w-full p-3 rounded mb-4 text-white bg-indigo-950"
                        name="taskDeadline"
                        placeholder="Deadline(YYYY-MM-DD)"
                        id="taskDeadline"
                        pattern="\d{4}-\d{2}-\d{2}"
                        value={taskDeadline}
                        onChange={(e) => setTaskDeadline(e.target.value)}
                        required
                    />
                    <select
                        className="block border border-white w-full p-3 rounded mb-4 text-white bg-indigo-950 hover:text-blue-800"
                        name="assignedTo"
                        id="assignedTo"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        required
                    >
                        <option value="">Select Assignee</option>
                        {teamMembers.map(person => (
                            <option key={person.id} value={person.id}>
                                {person.name}
                            </option>
                        ))}
                    </select>
                    <select
                        className="block border border-white w-full p-3 rounded mb-4 text-white bg-indigo-950 hover:text-indigo-800"
                        name="status"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        {statuses.map((status, index) => (
                            <option key={index} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <div>
                        <button
                            onClick={handleSubmit}
                            className="z-20 w-1/2 text-center py-3 rounded bg-transparent text-white font-bold focus:outline-none my-1 border border-transparent hover:border-white "
                        >
                            Add
                        </button>
                        <button
                            onClick={close}
                            className="z-20 w-1/2 text-center py-3 rounded bg-transparent text-white font-bold focus:outline-none my-1 border border-transparent hover:border-white "
                        >
                            Close
                        </button>
                    </div>
                </div>
        </div>
    );
};

export default TaskPopUp;
