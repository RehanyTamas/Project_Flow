import React from "react";

const ProjectDetailsTable = ({project}) =>{

    return (
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
    )
}

export default ProjectDetailsTable;