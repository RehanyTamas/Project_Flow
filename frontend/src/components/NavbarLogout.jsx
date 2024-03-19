import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import AppConfig from "../config";
import axios from 'axios';


const LogOutNavbar = ({ setIsLoggedIn }) => {

    let navigate = useNavigate();

    const handleClick = () => {
        axios.posr(`${AppConfig.backendUrl}/api/logout`, null, {withCredentials: true})
            .then(() => {
                setIsLoggedIn(false);
                navigate('/login');
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
            <nav className="bg-gray-700">
                <div className="container mx-auto py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-gray-50 cursor-pointer">
                        ProjectFlow
                    </Link>

                    <div className="flex space-x-10">
                        <Link to="/cart" className="text-2xl font-bold text-gray-50 cursor-pointer">
                            <div className="flex items-center space-x-2 cursor-pointer">
                                Cart
                                <span>
                                    <svg className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                    </svg>
                                </span>
                                <span className="text-gray-50"></span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex space-x-10">
                        <div onClick={handleClick} className="flex items-center space-x-2 cursor-pointer">
                            <span>
                                <svg className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                </svg>
                            </span>
                            <span className="text-gray-50">Logout</span>
                        </div>
                        <div onClick={() => handleClickRedirectOnly('/sales')}
                             className="flex items-center space-x-2 cursor-pointer">
                            <span>
                                <svg className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                </svg>
                            </span>
                            <span className="text-gray-50">My stuff</span>
                        </div>
                    </div>

                    <div className="lg:flex hidden items-center space-x-2 bg-white py-1 px-2 rounded-full">
                        <span>
                            <svg className="h-6 w-6 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </span>
                        <input className="outline-none" type="text" placeholder="Search"/>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default LogOutNavbar
