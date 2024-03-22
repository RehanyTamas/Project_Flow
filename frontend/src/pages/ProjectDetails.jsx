import React, {useEffect, useState} from 'react';
import axios from "axios";
import AppConfig from "../config";
import {useParams} from "react-router-dom";

const ProjectDetails = () => {

    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [token,setToken] = useState(null);

    useEffect(() =>{
        setToken( localStorage.getItem('loginToken'));

    },[])

    useEffect(() => {
        if(token != null){
            fetchProjectDetail(token,id)
                .then((project) => {
                    setProject(project);
                });
        }
    }, [token,id]);

    const fetchProjectDetail = async (token,id) => {

        try {
            const response = await axios.get(`${AppConfig.backendUrl}/api/my-projects/${id}`, {
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
            {project ? (
                <div key={project.id}>
                    <div>Project name: {project.name}</div>
                    <div>Project description: {project.description}</div>
                    <div>Project deadline: {project.deadline}</div>
                    <div>Project creator: {project.creator}</div>
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team
                                    Member Name
                                </th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {project.team_members.map((teamMember) => (
                                <tr key={teamMember.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{teamMember.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task
                                    Name
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned
                                    To
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status
                                </th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {project.tasks.map((task) => (
                                <tr key={task.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{task.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{task.assigned_to}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : <div> Loading</div>
            }
        </div>


    )
}

export default ProjectDetails