import React, {useEffect, useState} from 'react';
import axios from "axios";
import AppConfig from "../config";
import {Link, useNavigate, useParams} from "react-router-dom";
import CommentSection from "../components/Comments/CommentSection";

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
        <div className={"bg-custom-dark mt-20 min-h-screen"}>
            {project ? (
                <div className={"text-white"} key={project.id}>
                    <div className={"pt-4"}>
                        <span className={"ml-4 text-white font-medium text-2xl pr-4 underline"}>Project: </span>
                        <span className={"text-white font-bold text-2xl pr-2"}>{project.name}</span>
                        <span className={"text-white font-bold text-2xl"}>(ID: {project.id})</span>
                    </div>
                    <div className={"pt-4"}>
                        <span
                            className={"ml-4 text-white font-medium pr-4 underline text-2xl"}>Project description: </span>
                        <span className={"text-white font-bold text-2xl"}>{project.description}</span>
                    </div>
                    <div className={"pt-4"}>
                        <span
                            className={"ml-4 text-white font-medium pr-4 underline text-2xl"}>Project deadline: </span>
                        <span className={"text-white font-bold text-2xl"}>{project.deadline}</span>
                    </div>
                    <div className={"pt-4"}>
                        <span className={"ml-4 text-white font-medium pr-4 underline text-2xl"}>Project creator: </span>
                        <span className={"text-white font-bold text-2xl"}>{project.creator}</span>
                    </div>
                    <div className={"pt-6 ml-4 "}>
                        <table>
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 bg-indigo-950 text-center text-white font-bolduppercase tracking-wider text-2xl border-b border-white">Team
                                    members:
                                </th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody
                                className="bg-blue-900 ${index === project.team_members.length - 1 ? 'border-b' : ''} border-white divide-y divide-gray-200">
                            {project.team_members.map((teamMember) => (
                                <tr key={teamMember.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-white font-bold text-center">{teamMember.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={"pt-6 ml-4"}>
                        <table>
                            <thead>
                            <tr>
                                <th scope="col"
                                    className=" bg-indigo-950 border-r border-b border-white px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Task
                                    Name
                                </th>
                                <th scope="col"
                                    className=" bg-indigo-950 border-r border-b border-white px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Description
                                </th>
                                <th scope="col"
                                    className=" bg-indigo-950 border-r border-b border-white px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Assigned
                                    To
                                </th>
                                <th scope="col"
                                    className=" bg-indigo-950 border-l border-b border-white px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status
                                </th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody className="bg-indigo-950 text-white text-center font-bold divide-y divide-gray-200">
                            {project.tasks.map((task) => (
                                <tr key={task.id}>
                                    <td className="${index === project.team_members.length - 1 ? 'border-b' : ''} border-r px-6 py-4 whitespace-nowrap">{task.name}</td>
                                    <td className="${index === project.team_members.length - 1 ? 'border-b' : ''} border-r px-6 py-4 whitespace-nowrap">{task.description}</td>
                                    <td className="${index === project.team_members.length - 1 ? 'border-b' : ''} border-r px-6 py-4 whitespace-nowrap">{task.assignedToName}</td>
                                    <td className="${index === project.team_members.length - 1 ? 'border-b' : ''} border-l px-6 py-4 whitespace-nowrap">{task.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : <div className={"bg-custom-dark min-h-screen"}> Loading</div>
            }
            {project ? (
                <div className="pt-6 ml-4">
                    <h2 className="text-white font-bold text-2xl underline pb-5">Comments</h2>
                    <CommentSection token={token} projectId={id} initialComments={project.comments || []}/>
                </div>
            ) : <div/>}
            {/*<div className="pt-6 ml-4">
                <h2 className="text-white font-bold text-2xl underline">Comments</h2>
                <CommentSection projectId={id} initialComments={project.comments || []}/>
            </div>*/}
        </div>
    )
}

export default ProjectDetails