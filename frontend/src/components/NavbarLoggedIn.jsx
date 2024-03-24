import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import AppConfig from "../config";
import axios from 'axios';


const NavbarLoggedIn = ({ setIsLoggedIn }) => {

    let navigate = useNavigate();

    const [token,setToken] = useState(null);
    useEffect(() =>{
        setToken( localStorage.getItem('loginToken'));
    },[token])

    const handleClick = () => {

        const out = 'Bearer ' + token;

        const headers = {
            'Authorization': out,
        }

        axios.post(`${AppConfig.backendUrl}/api/logout`, null, {headers})
            .then(() => {
                localStorage.clear();
                setIsLoggedIn(false);
                navigate('/');
                window.location.reload();
            })
            .catch(error => {
                console.error('Logout failed:', error);
            });
    }

    function handleClickRedirectOnly(path){
        navigate(path)
    }
    return (
        <header>
            <nav className="bg-custom-dark border-b border-white">
                <div className="container mx-auto py-4 flex justify-between items-center">
                    <div className={"relative p-3"} onClick={() => handleClickRedirectOnly('/')}>
                        <div
                            className={"rounded-lg flex justify-center items-center bg-transparent"}>
                            <h1 className="text-lg cursor-pointer text-white font-bold">
                                Project Flow
                            </h1>
                            <div
                                className="absolute inset-0 border border-white opacity-0 hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                    <div className={"relative p-3"} onClick={() => handleClickRedirectOnly('/my-projects')}>
                        <div
                            className={"rounded-lg flex justify-center items-center bg-transparent"}>
                            <h1 className="text-lg cursor-pointer text-white font-bold">
                                My projects
                            </h1>
                            <div
                                className="absolute inset-0 border border-white opacity-0 hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                    <div className={"relative p-3"} onClick={handleClick}>
                        <div
                            className={"rounded-lg flex justify-center items-center bg-transparent"}>
                            <h1 className="text-lg cursor-pointer text-white font-bold">
                                Logout
                            </h1>
                            <div
                                className="absolute inset-0 border border-white opacity-0 hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavbarLoggedIn
