import React, {useEffect, useState} from 'react';
import axios from "axios";
import AppConfig from "../config";

const HomeLoggedIn = () => {

    const [tasks, setTasks] = useState([]);
    const [token,setToken] = useState(null);

    useEffect(() =>{
        setToken( localStorage.getItem('loginToken'));

    },[])

    useEffect(() => {
        if(token != null){
            fetchTasks(token)
                .then((tasks) => {
                    setTasks(tasks);
                });
        }
    }, [token]);

    const fetchTasks = async (token) => {

        try {
            const response = await axios.get(`${AppConfig.backendUrl}/api/my-tasks`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            return [];
        }
    };

    const handleStatusChange = async (taskID,newStatus) => {
        try {
            await axios.put(`${AppConfig.backendUrl}/api/my-tasks/${taskID}`, {
                status: newStatus,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });
                setTasks((prevTasks) =>
                prevTasks.map((task) =>
                task.id === taskID ? { ...task, status: newStatus } : task
            )
        );
        }catch(error){
            console.error('Error updating task status:', error);
        }
    }

    return (
        <div className={"bg-custom-dark min-h-screen mt-20"}>
            <div className="max-w-screen-md mx-auto shadow-md p-6 rounded-md">
                <h2 className="text-2xl font-semibold mb-4 text-white">Task List</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-custom-dark">
                    <tr>
                        <th scope="col"
                            className=" font-bold text-white border-r border-b border-white bg-indigo-950 px-6 py-3 text-center text-xs uppercase tracking-wider">Task
                            Name
                        </th>
                        <th scope="col"
                            className="border-r border-b border-white bg-indigo-950 px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Description
                        </th>
                        <th scope="col"
                            className="border-r border-b border-white bg-indigo-950 px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Deadline
                        </th>
                        <th scope="col"
                            className="border-r border-b border-white bg-indigo-950 px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Project
                        </th>
                        <th scope="col"
                            className="border-b border-lborder-white bg-indigo-950 px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Status
                        </th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody className="bg-blue-900 divide-y divide-gray-200">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <tr key={task.id}>
                                <td className="px-6 py-4 whitespace-nowrap border-r ${index === projects.length - 1 ? 'border-b' : ''} border-white text-center text-white font-bold">{task.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-r ${index === projects.length - 1 ? 'border-b' : ''} border-white text-center text-white font-bold">{task.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-r ${index === projects.length - 1 ? 'border-b' : ''} border-white text-center text-white font-bold">{task.deadline}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-r ${index === projects.length - 1 ? 'border-b' : ''} border-white text-center text-white font-bold">{task.project.name}</td>
                                <td className={"border-l ${index === projects.length - 1 ? 'border-b' : ''} border-white"}>
                                    <select
                                        value={task.status}
                                        className={"bg-transparent font-bold text-white text-center hover:text-indigo-950"}
                                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                    >
                                        <option value="Not yet started">Not yet started</option>
                                        <option value="WIP">WIP</option>
                                        <option value="Stuck">Stuck</option>
                                        <option value="Complete">Complete</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-white font-bold" colSpan="5">No tasks. Lucky you....</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default HomeLoggedIn