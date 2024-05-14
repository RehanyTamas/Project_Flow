import React from "react";

const FilesTable = ({files,handleDownload,handleDelete}) =>{

    return (
        <table className={"min-w-full divide-y divide-gray-200"}>
            <thead className={"bg-custom-dark"}>
            <tr>
                <th className={"font-bold text-white border-r border-b border-white bg-indigo-950 px-6 py-3 text-center text-xs uppercase tracking-wider"}>Name</th>
                <th className={"font-bold text-white border-r border-b border-white bg-indigo-950 px-6 py-3 text-center text-xs uppercase tracking-wider"}>Size</th>
                <th className={"font-bold text-white border-r border-b border-white bg-indigo-950 px-6 py-3 text-center text-xs uppercase tracking-wider"}>Updated
                    Date
                </th>
                <th className={"font-bold text-white border-r border-b border-white bg-indigo-950 px-6 py-3 text-center text-xs uppercase tracking-wider"}>Download</th>
                <th className={"font-bold text-white border-r border-b border-white bg-indigo-950 px-6 py-3 text-center text-xs uppercase tracking-wider"}>Delete</th>
            </tr>
            </thead>
            <tbody>
            {files.map((file, index) => (
                <tr key={index}>
                    <td className={"px-6 py-4 whitespace-nowrap border-r ${index === projects.length - 1 ? 'border-b' : ''} border-white text-center text-white font-bold bg-blue-800"}>{file.name}</td>
                    <td className={"px-6 py-4 whitespace-nowrap border-r ${index === projects.length - 1 ? 'border-b' : ''} border-white text-center text-white font-bold bg-blue-800"}>{file.size}</td>
                    <td className={"px-6 py-4 whitespace-nowrap border-r ${index === projects.length - 1 ? 'border-b' : ''} border-white text-center text-white font-bold bg-blue-800"}>{file.updated_date}</td>
                    <td className={"px-6 py-4 whitespace-nowrap border-r ${index === projects.length - 1 ? 'border-b' : ''} border-white text-center text-white font-bold bg-blue-800"}>
                        <button className={"text-white hover:text-custom-dark"}
                                onClick={() => handleDownload(`${file.name}.${file.extension}`)}>Download
                        </button>
                    </td>
                    <td className={"px-6 py-4 whitespace-nowrap border-r ${index === projects.length - 1 ? 'border-b' : ''} border-white text-center text-white font-bold bg-blue-800"}>
                        <button className={"text-white hover:text-custom-dark"}
                                onClick={() => handleDelete(`${file.name}.${file.extension}`)}>Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default FilesTable;