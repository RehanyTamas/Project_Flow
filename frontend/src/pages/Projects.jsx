import React, {useEffect, useState} from 'react';
import axios from "axios";
import AppConfig from "../config";
import ProjectsTable from "../components/tables/ProjectsTable";

const MyProjects = () => {

    const [projects, setProjects] = useState([]);
    const [token,setToken] = useState(null);
    const [filterName, setFilterName] = useState("");
    const [filterDeadline, setFilterDeadline] = useState("");
    const [filteredProjects,setFilteredProjects] = useState([]);

    useEffect(() =>{
        setToken( localStorage.getItem('loginToken'));
    },[])

    useEffect(() => {
        if(token != null){
            fetchProjects(token)
                .then((projects) => {
                    setProjects(projects);
                    setFilteredProjects(projects);
                });
        }
    }, [token]);

    useEffect(() => {
        filterProjects();
    },[filterDeadline,filterName])

    const fetchProjects = async (token) => {

        try {
            const response = await axios.get(`${AppConfig.backendUrl}/api/team-member-projects`, {
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

    function filterProjects(){
        const filterOutput = projects.filter((project) => {
            const nameMatch = project.name.toLowerCase().includes(filterName.toLowerCase());
            const deadlineMatch = project.deadline.includes(filterDeadline);
            return nameMatch && deadlineMatch;
        });

        setFilteredProjects(filterOutput)
    }

    return (
        <div className={"mt-20 bg-custom-dark min-h-screen min-w-fit"}>
            <div className={"max-w-screen-md mx-auto bg-transparent mt-20 shadow-md p-6 rounded-md"}>
                <h2 className={"text-2xl font-bold text-white mb-4 text-center"}>Project List</h2>
                <div className={"bg-custom-dark"}>
                    <div className={"flex justify-between mb-4"}>
                        <input
                            type="text"
                            placeholder="Name"
                            className={"px-4 py-2 rounded-md bg-gray-800 text-white"}
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="yyyy-mm-dd"
                            className={"px-4 py-2 rounded-md bg-gray-800 text-white"}
                            value={filterDeadline}
                            onChange={(e) => setFilterDeadline(e.target.value)}
                        />
                    </div>
                </div>
                <ProjectsTable
                    filteredProjects={filteredProjects}
                />
            </div>
        </div>
    )
}

export default MyProjects