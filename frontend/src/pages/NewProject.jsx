import React, {useEffect, useState} from 'react';
import axios from "axios";
import AppConfig from "../config";
import { useNavigate} from "react-router-dom";
import TaskPopUp from "../components/TaskPopUp";

const NewProject = () => {

    let navigate = useNavigate();

    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [token, setToken] = useState(null);
    const [availablePeople, setAvailablePeople] = useState([]);
    const [showTaskPopup, setShowTaskPopup] = useState(false);



    useEffect(() =>{
        setToken( localStorage.getItem('loginToken'));

    },[])

    useEffect(() => {
        // Fetch data when component mounts
        if(token != null){
            fetchPeople(token);
        }

    }, [token]);

    const fetchPeople = async (token) => {

        try {
            const response = await axios.get(`${AppConfig.backendUrl}/api/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            setAvailablePeople(response.data);
        } catch (error) {
            console.error("Error fetching people:", error);
            return [];
        }
    };

    const HandleNewProject = (event) => {
        event.preventDefault();
        try {
            let $projectData = {
                name: projectName,
                description: description,
                deadline: deadline,
                teamMembers: teamMembers,
                tasks: tasks
            };

            axios.post(`${AppConfig.backendUrl}/api/new-project`, $projectData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(data => {
                    setTimeout(() => {
                        navigate('/my-projects')
                        window.location.reload();
                    }, 1500)
                });
        } catch (error) {
            console.error("Error adding new project", error);
            return [];
        }
    };

    const isPersonInTeam = (person) => {
        return teamMembers.some(member => member.id === person.id); // Assuming each person object has an 'id' property
    };

    const addPersonToTeam = (person) => {
        if (!isPersonInTeam(person)) {
            setTeamMembers([...teamMembers, person]);
        }
    };
    const removePersonFromTeam = (personToRemove) => {
        const updatedTeam = teamMembers.filter(person => person.id !== personToRemove.id);
        setTeamMembers(updatedTeam);
    };

    const removeTask = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    };

    const openTaskPopup = () => {
        setShowTaskPopup(true);
    };

    const closeTaskPopup = () => {
        setShowTaskPopup(false);
    };

    return (
        <div className=''>
            <form class="bg-grey-lighter min-h-screen flex flex-col" onSubmit={HandleNewProject}>
                <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 class="mb-8 text-3xl text-center">New Project</h1>
                        <input
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            placeholder="Name"
                            id="projectName"
                            name="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            placeholder="Description"
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <input
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="deadline"
                            placeholder="Deadline(YYYY-MM-DD)"
                            id="deadline"
                            pattern="\d{4}-\d{2}-\d{2}"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />
                        <div>Team members</div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Add/Remove
                                </th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {availablePeople.map((person) => (
                                <tr key={person.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {isPersonInTeam(person) ?
                                            <button type="button"
                                                    onClick={() => removePersonFromTeam(person)}>Remove</button> :
                                            <button type="button" onClick={() => addPersonToTeam(person)}>Add</button>
                                        }
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
                            <td className="px-6 py-4 whitespace-nowrap">{task.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.deadline}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.assignedTo}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button type="button" onClick={() => removeTask(index)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
                    <button type="button" onClick={openTaskPopup}>Add Task</button>
                    {showTaskPopup && (
                        <TaskPopUp
                            teamMembers={teamMembers}
                            setTasks={setTasks}
                            onClose={closeTaskPopup}
                        />
                    )}
                </div>
                <div>
                    <button
                        type="submit"
            className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-500 focus:outline-none my-1">Add
        </button>
    </div>
</form>
</div>
)
}

export default NewProject