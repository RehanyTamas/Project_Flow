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
        <div className={"mt-10 bg-custom-dark min-h-screen min-w-fit"}>
            <form className="bg-custom-dark min-h-screen flex flex-col" onSubmit={updateProject}>
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-custom-dark px-6 py-8 rounded shadow-md text-white font-bold w-full">
                        <h1 className="mb-8 text-3xl text-center">Project</h1>
                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4 text-white font-bold bg-indigo-950"
                            placeholder="Name"
                            name="name"
                            value={project.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4 text-white font-bold bg-indigo-950"
                            placeholder="Description"
                            name="description"
                            value={project.description}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4 text-white font-bold bg-indigo-950"
                            placeholder="Deadline (YYYY-MM-DD)"
                            name="deadline"
                            pattern="\d{4}-\d{2}-\d{2}"
                            value={project.deadline}
                            onChange={handleChange}
                            required
                        />
                        <h2 className={"text-center font-bold text-white pb-2"}>Team members</h2>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-indigo-950 text-white font-bold">
                            <tr>
                                <th className="border-b border-r text-white font-bold border-white px-6 py-3 text-left text-xs uppercase tracking-wider">Name</th>
                                <th className="border-b border-l text-white font-bold border-white px-6 py-3 text-left text-xs uppercase tracking-wider">Add/Remove</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody className="bg-blue-900 divide-y divide-gray-200">
                            {availablePeople.map((person) => (
                                <tr key={person.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-white font-bold border-r ${index === availablePeople.length - 1 ? 'border-b' : ''}">{person.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-white font-bold border-l ${index === availablePeople.length - 1 ? 'border-b' : ''}">
                                        {isPersonInTeam(person) ? (
                                            <button type="button"
                                                    className={"hover:text-indigo-950"}
                                                    onClick={() => removePersonFromTeam(person)}>- Remove</button>
                                        ) : (
                                            <button type="button" className={"hover:text-indigo-950"}
                                                    onClick={() => addPersonToTeam(person)}>+ Add</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <h2 className={"text-center font-bold text-white pb-2"}>Tasks</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-950">
                        <tr>
                            <th scope="col"
                                className="border-b border-r text-white font-bold border-white px-6 py-3 text-left text-xs uppercase tracking-wider">Name
                            </th>
                            <th scope="col"
                                className="border-b border-r text-white font-bold border-white px-6 py-3 text-left text-xs uppercase tracking-wider">Description
                            </th>
                            <th scope="col"
                                className="border-b border-r text-white font-bold border-white px-6 py-3 text-left text-xs uppercase tracking-wider">Deadline
                            </th>
                            <th scope="col"
                                className="border-b border-r text-white font-bold border-white px-6 py-3 text-left text-xs uppercase tracking-wider">Assigned
                                To
                            </th>
                            <th scope="col"
                                className="border-b border-r text-white font-bold border-white px-6 py-3 text-left text-xs uppercase tracking-wider">Status
                            </th>
                            <th scope="col"
                                className="border-b border-l text-white font-bold border-white px-6 py-3 text-left text-xs uppercase tracking-wider">Remove
                            </th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td className="${index === tasks.length - 1 ? 'border-b' : ''} border-r border-white px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                                    <input
                                        type="text"
                                        className="border-transparent px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold"
                                        value={task.name}
                                        onChange={(e) => {
                                            const newTasks = [...tasks];
                                            newTasks[index].name = e.target.value;
                                            setTasks(newTasks);
                                        }}
                                    />
                                </td>
                                <td className="${index === tasks.length - 1 ? 'border-b' : ''} border-r border-white px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                                    <input
                                        type="text"
                                        className="border-transparent px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold"
                                        value={task.description}
                                        onChange={(e) => {
                                            const newTasks = [...tasks];
                                            newTasks[index].description = e.target.value;
                                            setTasks(newTasks);
                                        }}
                                    />
                                </td>
                                <td className="${index === tasks.length - 1 ? 'border-b' : ''} border-r border-white px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold h-1/2">
                                    <input
                                        type="text"
                                        className="border-transparent px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold"
                                        pattern="\d{4}-\d{2}-\d{2}"
                                        value={task.deadline}
                                        onChange={(e) => {
                                            const newTasks = [...tasks];
                                            newTasks[index].deadline = e.target.value;
                                            setTasks(newTasks);
                                        }}
                                    />
                                </td>
                                <td className="${index === tasks.length - 1 ? 'border-b' : ''} border-r border-white px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                                    <select
                                        className="block border-transparent w-full p-3 rounded mb-4 px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold hover:text-indigo-950"
                                        name="assignedTo"
                                        id="assignedTo"
                                        value={task.assignedTo}
                                        onChange={(e) => {
                                            const newTasks = [...tasks];
                                            newTasks[index].assignedTo = e.target.value;
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
                                <td className="${index === tasks.length - 1 ? 'border-b' : ''} border-r border-white px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                                    <select
                                        value={task.status}
                                        className="border-transparent px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold hover:text-indigo-950"
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
                                <td className="${index === tasks.length - 1 ? 'border-b' : ''} border-l border-white px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                                    <button type="button" className={"hover:text-indigo-950"}
                                            onClick={() => removeTask(index)}>- Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className={"flex items-center justify-center"}>
                        <button type="button"
                                className="z-20  text-center py-3 rounded bg-transparent text-white font-bold focus:outline-none my-1 border border-transparent hover:border-white mb-1"
                                onClick={openTaskPopup}>Add Task
                        </button>
                    </div>
                    <div>
                        {showTaskPopup &&
                            <TaskPopUp teamMembers={project.team_members} setTasks={setTasks}
                                       onClose={closeTaskPopup}/>}
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <button
                            type="submit"
                            className="z-20  text-center py-3 rounded bg-transparent text-white font-bold focus:outline-none my-1 border border-transparent hover:border-white ">Update
                            Project
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default ProjectEditor;
