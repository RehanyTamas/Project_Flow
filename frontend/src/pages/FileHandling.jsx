import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppConfig from "../config";
import FilesTable from "../components/tables/FilesTable";

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);
    const [token,setToken] = useState(null);

    useEffect(() =>{
        setToken( localStorage.getItem('loginToken'));
    },[])

    // Fetch files metadata on component mount
    useEffect(() => {
        if(token != null){
            getFilesMetadata();
        }
    }, [token]);

    const getFilesMetadata = async () => {
        try {
            const response = await axios.get(`${AppConfig.backendUrl}/api/my-files`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files metadata', error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${AppConfig.backendUrl}/api/upload-file`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                },
            });
            console.log('File uploaded successfully', response.data);

            getFilesMetadata();
        } catch (error) {
            console.error('Error uploading file', error);
        }
    };

    const handleDownload = async (filename) => {
        try {
            const response = await axios.get(`${AppConfig.backendUrl}/api/my-files/${filename}`, {
                responseType: 'blob',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });


            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading file', error);
        }
    };

    const handleDelete = async (filename) => {
        try {
            await axios.delete(`${AppConfig.backendUrl}/api/delete-file/${filename}`,{
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            });
            getFilesMetadata();
        } catch (error) {
            console.error('Error deleting file', error);
        }
    };

    return (
        <div className={"bg-custom-dark min-h-screen mt-20"}>
            <div className={"max-w-screen-md mx-auto shadow-md p-6 rounded-md"}>
                <h2 className={"text-2xl font-semibold mb-4 text-white"}>Files</h2>
                <FilesTable
                    files={files}
                    handleDownload={(fileName)=>handleDownload(fileName)}
                    handleDelete={(filename) =>handleDelete(filename)}
                />
                <form className={"pt-8 text-white"} onSubmit={handleSubmit}>
                    <input className={"text-white font-bold"} type="file" onChange={handleFileChange}/>
                    <div className={"flex items-center justify-center"}>
                        <button
                            type="submit"
                            className="z-20 w-1/6 text-center py-3 rounded bg-transparent text-white font-bold focus:outline-none my-1 border border-transparent hover:border-white "
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FileUpload;
