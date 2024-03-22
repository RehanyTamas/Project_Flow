import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AppConfig from '../config';
import TaskPopUp from '../components/TaskPopUp';

const ProjectEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [project, setProject] = useState({ name: '', description: '', deadline: '', team_members: [] });
    const [availablePeople, setAvailablePeople] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showTaskPopup, setShowTaskPopup] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem('loginToken'));
    }, []);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`${AppConfig.backendUrl}/api/my-projects/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProject(response.data);
                setTasks(response.data.tasks); // Assuming the backend sends tasks along with project details
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };

        if (token != null) {
            fetchPeople(token);
            fetchProjectDetails();
        }
    }, [id, token]);

    useEffect(() => {
        // Fetch data when component mounts
        if (token != null) {
            fetchPeople(token);
        }
    }, [token]);

    const fetchPeople = async (token) => {
        try {
            const response = await axios.get(`${AppConfig.backendUrl}/api/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setAvailablePeople(response.data);
        } catch (error) {
            console.error('Error fetching people:', error);
        }
    };

    const updateProject = async (event) => {
        event.preventDefault();

        project.tasks = tasks;

        try {
            await axios.put(`${AppConfig.backendUrl}/api/my-projects/${id}`, project, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate(`/my-projects/${id}`); // Navigate to project details page after updating
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const isPersonInTeam = (person) => {
        return project.team_members.some((member) => member.id === person.id); // Assuming each person object has an 'id' property
    };

    const addPersonToTeam = (person) => {
        if (!isPersonInTeam(person)) {
            setProject({ ...project, team_members: [...project.team_members, person] });
        }
    };

    const removePersonFromTeam = (personToRemove) => {
        const updatedTeam = project.team_members.filter((person) => person.id !== personToRemove.id);
        setProject({ ...project, team_members: updatedTeam });
    };

    const removeTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const openTaskPopup = () => {
        setShowTaskPopup(true);
    };

    const closeTaskPopup = () => {
        setShowTaskPopup(false);
    };

    return (
        <div className="">
            <form className="bg-grey-lighter min-h-screen flex flex-col" onSubmit={updateProject}>
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Project</h1>
                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            placeholder="Name"
                            name="name"
                            value={project.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            placeholder="Description"
                            name="description"
                            value={project.description}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            placeholder="Deadline (YYYY-MM-DD)"
                            name="deadline"
                            pattern="\d{4}-\d{2}-\d{2}"
                            value={project.deadline}
                            onChange={handleChange}
                            required
                        />
                        <div>Team members</div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Add/Remove</th>
                                <th />
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {availablePeople.map((person) => (
                                <tr key={person.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {isPersonInTeam(person) ? (
                                            <button type="button" onClick={() => removePersonFromTeam(person)}>Remove</button>
                                        ) : (
                                            <button type="button" onClick={() => addPersonToTeam(person)}>Add</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div>Tasks</div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned
                                To
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remove
                            </th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="text"
                                        value={task.name}
                                        onChange={(e) => {
                                            const newTasks = [...tasks];
                                            newTasks[index].name = e.target.value;
                                            setTasks(newTasks);
                                        }}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="text"
                                        value={task.description}
                                        onChange={(e) => {
                                            const newTasks = [...tasks];
                                            newTasks[index].description = e.target.value;
                                            setTasks(newTasks);
                                        }}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="text"
                                        pattern="\d{4}-\d{2}-\d{2}"
                                        value={task.deadline}
                                        onChange={(e) => {
                                            const newTasks = [...tasks];
                                            newTasks[index].deadline = e.target.value;
                                            setTasks(newTasks);
                                        }}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="assignedTo"
                                        id="assignedTo"
                                        value={task.assigned_to}
                                        onChange={(e) => {
                                            const newTasks = [...tasks];
                                            newTasks[index].assigned_to = e.target.value;
                                            setTasks(newTasks);
                                        }}
                                        required
                                    >
                                        {project.team_members.map(person => (
                                            <option key={person.id} value={person.id}>
                                                {person.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={task.status}
                                        onChange={(e) => {
                                            const newTasks = [...tasks];
                                            newTasks[index].status = e.target.value;
                                            setTasks(newTasks);
                                        }}
                                    >
                                        <option value="Not yet started">Not yet started</option>
                                        <option value="WIP">WIP</option>
                                        <option value="Stuck">Stuck</option>
                                        <option value="Complete">Complete</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button type="button" onClick={() => removeTask(index)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
                    <button type="button" onClick={openTaskPopup}>Add Task</button>
                    {showTaskPopup &&
                        <TaskPopUp teamMembers={project.team_members} setTasks={setTasks} onClose={closeTaskPopup}/>}
                </div>
                <div>
                    <button type="submit"
                            className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-500 focus:outline-none my-1">Update
                        Project
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectEditor;
