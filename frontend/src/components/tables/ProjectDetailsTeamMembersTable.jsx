import React from "react";

const ProjectDetailsTeamMembersTable = ({teamMembers}) =>{

    return (
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
            {teamMembers.map((teamMember) => (
                <tr key={teamMember.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-white font-bold text-center">{teamMember.name}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default ProjectDetailsTeamMembersTable;