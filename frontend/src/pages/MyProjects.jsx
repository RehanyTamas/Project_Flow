import React, {useEffect, useState} from 'react';
import axios from "axios";
import AppConfig from "../config";
import {Link} from "react-router-dom";

const MyProjects = () => {

    const [projects, setProjects] = useState([]);
    const [token,setToken] = useState(null);

    useEffect(() =>{
        setToken( localStorage.getItem('loginToken'));

    },[])

    useEffect(() => {
        if(token != null){
            fetchProjects(token)
                .then((projects) => {
                    setProjects(projects);
                });
        }
    }, [token]);

    const fetchProjects = async (token) => {

        try {
            const response = await axios.get(`${AppConfig.backendUrl}/api/my-projects`, {
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

    return (
        <div>
            <div className="max-w-screen-md mx-auto bg-white shadow-md p-6 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Project List</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project
                            Name
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details
                        </th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{project.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{project.deadline}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link to={`/my-projects/${project.id}`}>
                                    <button type="button">Details</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyProjects