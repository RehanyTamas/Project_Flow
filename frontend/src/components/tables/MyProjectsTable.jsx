import {Link} from "react-router-dom";
import React from "react";

const MyProjectsTable = ({projects,deleteProject}) =>{

    return (
        <table className={"min-w-full divide-y divide-gray-200 bg-custom-dark pb-4 "}>
            <thead className="bg-gray-50">
            <tr>
                <th scope="col"
                    className={"border-b border-r border-white px-6 py-3 text-center text-xs font-bold text-white bg-indigo-950 uppercase tracking-wider"}>Project
                    Name
                </th>
                <th scope="col"
                    className={"border-b border-r border-white px-6 py-3 text-center text-xs font-bold text-white bg-indigo-950 uppercase tracking-wider"}>Deadline
                </th>
                <th scope="col"
                    className={"border-b border-r border-white px-6 py-3 text-center text-xs font-bold text-white bg-indigo-950 uppercase tracking-wider"}>Details
                </th>
                <th scope="col"
                    className={"border-b border-r border-white px-6 py-3 text-center text-xs font-bold text-white bg-indigo-950 uppercase tracking-wider"}>Edit
                </th>
                <th scope="col"
                    className={"border-b border-l border-white px-6 py-3 text-center text-xs font-bold text-white bg-indigo-950 uppercase tracking-wider"}>Delete
                </th>
            </tr>
            </thead>
            <tbody className={"bg-blue-900 divide-y divide-gray-200"}>
            {projects.map((project) => (
                <tr key={project.id}>
                    <td className={"${index === projects.length - 1 ? 'border-b' : ''} border-r border-white text-white text-center font-bold px-6 py-4 whitespace-nowrap"}>{project.name}</td>
                    <td className={"${index === projects.length - 1 ? 'border-b' : ''} border-r border-white text-white text-center font-bold px-6 py-4 whitespace-nowrap"}>{project.deadline}</td>
                    <td className={"${index === projects.length - 1 ? 'border-b' : ''} border-r border-white text-white text-center font-bold px-6 py-4 whitespace-nowrap"}>
                        <Link to={`/my-projects/${project.id}`}>
                            <button type="button" className={"hover:text-indigo-950"}>Details</button>
                        </Link>
                    </td>
                    <td className="${index === projects.length - 1 ? 'border-b' : ''} border-r border-white text-white text-center font-bold  px-6 py-4 whitespace-nowrap">
                        <Link to={`/my-projects/edit/${project.id}`}>
                            <button type="button" className={"hover:text-indigo-950"}>Edit</button>
                        </Link>
                    </td>
                    <td className="${index === projects.length - 1 ? 'border-b' : ''} border-l border-white text-white text-center font-bold px-6 py-4 whitespace-nowrap">
                        <button onClick={() => deleteProject(project.id)}
                                className={"hover:text-indigo-950"}>Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default MyProjectsTable;