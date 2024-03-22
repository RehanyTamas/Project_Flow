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
        <div>
            <div className="max-w-screen-md mx-auto bg-white shadow-md p-6 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Task List</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task
                            Name
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status
                        </th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <tr key={task.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{task.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.deadline}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.project.name}</td>
                                <td>
                                    <select
                                        value={task.status}
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
                            <td className="px-6 py-4 whitespace-nowrap" colSpan="5">Loading...</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default HomeLoggedIn