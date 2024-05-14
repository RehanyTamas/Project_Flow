import React from "react";

const TeamMembersTable= ({availablePeople,isPersonInTeam,removePersonFromTeam,addPersonToTeam}) =>{

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-950 text-white font-bold">
            <tr>
                <th className="border-b border-r text-white font-bold border-white px-6 py-3 text-left text-xs uppercase tracking-wider">Name</th>
                <th className="border-b border-l text-white font-bold border-white px-6 py-3 text-left text-xs uppercase tracking-wider">Add/Remove</th>
                <th/>
            </tr>
            </thead>
            <tbody className="bg-blue-900 divide-y divide-gray-200">
            {availablePeople.map((person) => (
                <tr key={person.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-white font-bold border-r ${index === availablePeople.length - 1 ? 'border-b' : ''}">{person.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white font-bold border-l ${index === availablePeople.length - 1 ? 'border-b' : ''}">
                        {isPersonInTeam(person) ? (
                            <button type="button"
                                    className={"hover:text-indigo-950"}
                                    onClick={() => removePersonFromTeam(person)}>- Remove</button>
                        ) : (
                            <button type="button" className={"hover:text-indigo-950"}
                                    onClick={() => addPersonToTeam(person)}>+ Add</button>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default TeamMembersTable;