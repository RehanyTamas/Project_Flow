import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AppConfig from '../config';
import TaskPopUp from '../components/popups/TaskPopUp';
import ProjectTaskTable from "../components/tables/ProjectTaskTable";
import TeamMembersTable from "../components/tables/TeamMembersTable";

const ProjectEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [project, setProject] = useState({ name: '', description: '', deadline: '', team_members: [] });
    const [availablePeople, setAvailablePeople] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showTaskPopup, setShowTaskPopup] = useState(false);
    const [isButtonBusy, setIsButtonBusy] = useState(false);

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
                setTasks(response.data.tasks);
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

        setIsButtonBusy(true);

        project.tasks = tasks;

        try {
            await axios.put(`${AppConfig.backendUrl}/api/my-projects/${id}`, project, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate(`/my-projects/${id}`);
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
                        teamMembers={project.team_members}
                        removeTask={(index)=>removeTask(index)}
                    />
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
                            className="z-20  text-center py-3 rounded bg-transparent text-white font-bold focus:outline-none my-1 border border-transparent hover:border-white "
                            disabled={isButtonBusy}
                        >
                            Update
                            Project
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default ProjectEditor;
