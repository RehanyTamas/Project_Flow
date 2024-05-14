import React, {useEffect, useState} from 'react';
import axios from "axios";
import AppConfig from "../config";
import { useNavigate} from "react-router-dom";
import TaskPopUp from "../components/popups/TaskPopUp";
import TeamMembersTable from "../components/tables/TeamMembersTable";
import ProjectTaskTable from "../components/tables/ProjectTaskTable";

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
                    <TeamMembersTable
                        availablePeople={availablePeople}
                        isPersonInTeam={(person)=>isPersonInTeam(person)}
                        removePersonFromTeam={(person)=>removePersonFromTeam(person)}
                        addPersonToTeam={(person) => addPersonToTeam(person)}
                    />
                </div>
                <h2 className={"text-center font-bold text-white pb-2"}>Tasks</h2>
                <ProjectTaskTable
                    tasks={tasks}
                    setTasks={(newTasks)=>setTasks(newTasks)}
                    teamMembers={teamMembers}
                    removeTask={(index)=>removeTask(index)}
                />
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