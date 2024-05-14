import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    let navigate = useNavigate();

    function handleClick(path){
        navigate(path);
    }

    return (
        <header className="bg-transparent">
            <nav className="flex items-center justify-between py-4 px-6 text-white">
                <div className={"relative p-3"}  onClick={() => handleClick('/')}>
                    <div
                        className={"rounded-lg flex justify-center items-center bg-transparent"}>
                        <h1 className="text-lg font-semibold cursor-pointer">
                            Project Flow
                        </h1>
                        <div
                            className="absolute inset-0 border border-white opacity-0 hover:opacity-100 transition-opacity"></div>
                    </div>
                </div>
                <div>
                    <div className="flex space-x-8">
                        <div className={"relative p-3"} onClick={() => handleClick('/login')}>
                            <div
                                className={"rounded-lg flex justify-center items-center bg-transparent"}>
                                <h1 className="text-lg font-semibold cursor-pointer">
                                    Login
                                </h1>
                                <div
                                    className="absolute inset-0 border border-white opacity-0 hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>
                        <div className={"relative p-3"} onClick={() => handleClick('/register')}>
                            <div
                                className={"rounded-lg flex justify-center items-center bg-transparent"}>
                                <h1 className="text-lg font-semibold cursor-pointer">
                                    Register
                                </h1>
                                <div
                                    className="absolute inset-0 border border-white opacity-0 hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </nav>
        </header>
    );
};

export default Navbar;
