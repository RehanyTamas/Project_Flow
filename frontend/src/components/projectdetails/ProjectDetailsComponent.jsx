import ProjectDetailsTeamMembersTable from "../tables/ProjectDetailsTeamMembersTable";
import ProjectDetailsTable from "../tables/ProjectDetailsTable";
import React, {useEffect} from "react";
import axios from "axios";
import AppConfig from "../../config";

const ProjectDetailsComponent = ({token,id,project,setProject}) => {

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
                <ProjectDetailsTeamMembersTable
                    teamMembers={project.team_members}
                />
            </div>
            <div className={"pt-6 ml-4"}>
                <ProjectDetailsTable
                    project={project}
                />
            </div>
        </div>
            ) : <div className={"bg-custom-dark min-h-screen"}> Loading</div>
        }
        </div>
    )
}

export default ProjectDetailsComponent