import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import CommentSection from "../components/comments/CommentSection";
import ProjectDetailsComponent from "../components/projectdetails/ProjectDetailsComponent";

const ProjectDetails = () => {

    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [token,setToken] = useState(null);

    useEffect(() =>{
        setToken( localStorage.getItem('loginToken'));
    },[])

    return (
        <div className={"bg-custom-dark mt-20 min-h-screen"}>
                <ProjectDetailsComponent
                    token={token}
                    id={id}
                    project={project}
                    setProject={setProject}
                />
            {project ? (
                <div className="pt-6 ml-4">
                    <h2 className="text-white font-bold text-2xl underline pb-5">Comments</h2>
                    <CommentSection token={token} projectId={id} initialComments={project.comments || []}/>
                </div>
            ) : <div/>}
        </div>
    )
}

export default ProjectDetails