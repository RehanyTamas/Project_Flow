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
    const [isButtonBusy, setIsButtonBusy] = useState(false);


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

        setIsButtonBusy(true);

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
                })
                .finally(() => {
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
        <div className={"mt-20 bg-custom-dark min-h-screen min-w-fit"}>
            <form className="min-h-screen flex flex-col  w-1/3 mx-auto" onSubmit={HandleNewProject}>
                <div className="px-6 py-8 rounded shadow-md font-bold text-white w-full">
                    <h1 className="mb-8 text-3xl text-center">New Project</h1>
                    <input
                        className="block border border-grey-light w-full p-3 rounded mb-4 bg-indigo-950"
                        placeholder="Name"
                        id="projectName"
                        name="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />
                    <input
                        className="block border border-grey-light w-full p-3 rounded mb-4 bg-indigo-950"
                        placeholder="Description"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        className="block border border-grey-light w-full p-3 rounded mb-4 bg-indigo-950"
                        name="deadline"
                        placeholder="Deadline(YYYY-MM-DD)"
                        id="deadline"
                        pattern="\d{4}-\d{2}-\d{2}"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                    <h2 className={"text-center font-bold text-white pb-2"}>Team members</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-950">
                        <tr>
                            <th scope="col"
                                className="border-b border-r border-white px-6 py-3 text-center text-xs font-bold text-white bg-indigo-950 uppercase tracking-wider">Name
                            </th>
                            <th scope="col"
                                className="border-b border-l border-white px-6 py-3 text-center text-xs font-bold text-white bg-indigo-950 uppercase tracking-wider">Add/Remove
                            </th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody className="bg-blue-900 divide-y divide-gray-200">
                        {availablePeople.map((person) => (
                            <tr key={person.id}>
                                <td className="${index === availablePeople.length - 1 ? 'border-b' : ''} border-r border-white px-6 py-4 whitespace-nowrap text-center">{person.name}</td>
                                <td className="${index === availablePeople.length - 1 ? 'border-b' : ''} border-l border-white px-6 py-4 whitespace-nowrap text-center">
                                    {isPersonInTeam(person) ?
                                        <button type="button" className={"hover:text-indigo-950"}
                                                onClick={() => removePersonFromTeam(person)}>- Remove</button> :
                                        <button type="button" className={"hover:text-indigo-950"} onClick={() => addPersonToTeam(person)}>+ Add</button>
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <h2 className={"text-center font-bold text-white pb-2"}>Tasks</h2>
                <table className="min-w-full divide-y divide-gray-200 pb-2">
                    <thead className="bg-indigo-950">
                    <tr>
                        <th scope="col"
                            className="border-r border-b border-white px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Name
                        </th>
                        <th scope="col"
                            className="border-r border-b border-white px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Description
                        </th>
                        <th scope="col"
                            className="border-r border-b border-white px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Deadline
                        </th>
                        <th scope="col"
                            className="border-r border-b border-white px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Assigned
                            To
                        </th>
                        <th scope="col"
                            className="border-r border-b border-white px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Status
                        </th>
                        <th scope="col"
                            className="border-l border-b border-white px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Remove
                        </th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task, index) => (
                        <tr key={index}>
                            <td className="${index === availablePeople.length - 1 ? 'border-b' : ''} border-r border-white px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold"
                            >{task.name}</td>
                            <td className="${index === availablePeople.length - 1 ? 'border-b' : ''} border-r border-white px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                                {task.description}</td>
                            <td className="${index === availablePeople.length - 1 ? 'border-b' : ''} border-r border-white px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                                {task.deadline}</td>
                            <td className="${index === availablePeople.length - 1 ? 'border-b' : ''} border-r border-white px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                                {task.assignedTo}</td>
                            <td className="${index === availablePeople.length - 1 ? 'border-b' : ''} border-r border-white px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                                {task.status}</td>
                            <td className="${index === availablePeople.length - 1 ? 'border-b' : ''} border-l border-white px-6 py-4 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                                <button type="button" className={"hover:text-indigo-950"} onClick={() => removeTask(index)}>- Remove</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className={"flex items-center justify-center"}>
                    <button
                        className="z-20 w-1/2 text-center py-3 rounded bg-transparent text-white font-bold focus:outline-none my-1 border border-transparent hover:border-white mb-1"
                        type="button" onClick={openTaskPopup}>Add Task
                    </button>
                </div>
                <div>
                    {showTaskPopup && (
                        <TaskPopUp
                            teamMembers={teamMembers}
                            setTasks={setTasks}
                            onClose={closeTaskPopup}
                        />
                    )}
                </div>
                <div className={"flex items-center justify-center"}>
                    <button
                        type="submit"
                        className="z-20 w-1/6 text-center py-3 rounded bg-transparent text-white font-bold focus:outline-none my-1 border border-transparent hover:border-white "
                        disabled={isButtonBusy}
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewProject