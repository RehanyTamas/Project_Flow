import React from 'react';

const ProjectTaskTable = ({tasks,setTasks,teamMembers,removeTask}) => {

    return (
        <table className=" divide-y divide-gray-200">
            <thead className="bg-indigo-950">
            <tr>
                <th scope="col"
                    className="border-b border-r text-white font-bold border-white px-1 py-2 text-left text-xs uppercase tracking-wider">Name
                </th>
                <th scope="col"
                    className="border-b border-r text-white font-bold border-white px-1 py-2 text-left text-xs uppercase tracking-wider">Description
                </th>
                <th scope="col"
                    className="border-b border-r text-white font-bold border-white px-3 py-2 text-left text-xs uppercase tracking-wider">Deadline
                </th>
                <th scope="col"
                    className="border-b border-r text-white font-bold border-white px-10 py-2 text-left text-xs uppercase tracking-wider">Assigned
                    To
                </th>
                <th scope="col"
                    className="border-b border-r text-white font-bold border-white px-3 py-2 text-left text-xs uppercase tracking-wider">Status
                </th>
                <th scope="col"
                    className="border-b border-l text-white font-bold border-white px-3 py-2 text-left text-xs uppercase tracking-wider">Remove
                </th>
                <th/>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task, index) => (
                <tr key={index}>
                    <td className="${index === tasks.length - 1 ? 'border-b' : ''} border-r border-white px-1 py-2 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                        <input
                            type="text"
                            className="border-transparent px-1 py-2 whitespace-nowrap text-center bg-blue-900 text-white font-bold"
                            value={task.name}
                            onChange={(e) => {
                                const newTasks = [...tasks];
                                newTasks[index].name = e.target.value;
                                setTasks(newTasks);
                            }}
                        />
                    </td>
                    <td className="${index === tasks.length - 1 ? 'border-b' : ''} border-r border-white px-1 py-2 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                        <input
                            type="text"
                            className="border-transparent px-1 py-2 whitespace-nowrap text-center bg-blue-900 text-white font-bold"
                            value={task.description}
                            onChange={(e) => {
                                const newTasks = [...tasks];
                                newTasks[index].description = e.target.value;
                                setTasks(newTasks);
                            }}
                        />
                    </td>
                    <td className="${index === tasks.length - 1 ? 'border-b' : ''} border-r border-white px-3 py-2 whitespace-nowrap text-center bg-blue-900 text-white font-bold h-1/2">
                        <input
                            type="text"
                            className="border-transparent px-3 py-2 whitespace-nowrap text-center bg-blue-900 text-white font-bold"
                            pattern="\d{4}-\d{2}-\d{2}"
                            value={task.deadline}
                            onChange={(e) => {
                                const newTasks = [...tasks];
                                newTasks[index].deadline = e.target.value;
                                setTasks(newTasks);
                            }}
                        />
                    </td>
                    <td className="${index === tasks.length - 1 ? 'border-b' : ''} border-r border-white px-3 py-2 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                        <select
                            className="block border-transparent w-full p-3 rounded mb-4 px-3 py-2 whitespace-nowrap text-center bg-blue-900 text-white font-bold hover:text-indigo-950"
                            name="assignedTo"
                            id="assignedTo"
                            value={task.assignedTo}
                            onChange={(e) => {
                                const newTasks = [...tasks];
                                newTasks[index].assignedTo = e.target.value;
                                setTasks(newTasks);
                            }}
                            required
                        >
                            {teamMembers.map(person => (
                                <option key={person.id} value={person.id}>
                                    {person.name}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className="${index === tasks.length - 1 ? 'border-b' : ''} border-r border-white px-3 py-2 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                        <select
                            value={task.status}
                            className="border-transparent px-3 py-2 whitespace-nowrap text-center bg-blue-900 text-white font-bold hover:text-indigo-950"
                            onChange={(e) => {
                                const newTasks = [...tasks];
                                newTasks[index].status = e.target.value;
                                setTasks(newTasks);
                            }}
                        >
                            <option value="Not yet started">Not yet started</option>
                            <option value="WIP">WIP</option>
                            <option value="Stuck">Stuck</option>
                            <option value="Complete">Complete</option>
                        </select>
                    </td>
                    <td className="${index === tasks.length - 1 ? 'border-b' : ''} border-l border-white px-3 py-2 whitespace-nowrap text-center bg-blue-900 text-white font-bold">
                        <button type="button" className={"hover:text-indigo-950"}
                                onClick={() => removeTask(index)}>- Remove
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default ProjectTaskTable;