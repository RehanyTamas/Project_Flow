import React, {useEffect, useState} from 'react';
import { useNavigate, useParams} from "react-router-dom";
import CommentSection from "../components/comments/CommentSection";
import ProjectDetailsComponent from "../components/projectdetails/ProjectDetailsComponent";

const ProjectDetails = () => {

    let navigate = useNavigate();
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [token,setToken] = useState(null);

    useEffect(() =>{
        setToken( localStorage.getItem('loginToken'));

    },[])

    function handleClickRedirectOnly(path){
        navigate(path)
    }

    return (
        <div className={"bg-custom-dark mt-20 min-h-screen"}>
            <ProjectDetailsComponent
                token={token}
                id={id}
                project={project}
                setProject={setProject}
            />
            <div className={"relative p-3 w-1/12 flex items-center justify-center"}
                 onClick={() => handleClickRedirectOnly(`/my-projects/edit/${id}`)}>
                <div
                    className={"rounded-lg flex justify-center items-center bg-transparent"}>
                    <h1 className="text-lg cursor-pointer text-white font-bold text-left">
                        Edit
                    </h1>
                    <div
                        className="absolute inset-0 border border-white opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
            </div>
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