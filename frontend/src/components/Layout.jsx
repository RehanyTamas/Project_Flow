import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {  Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import NavbarLoggedIn from "./NavbarLoggedIn";
import Calendar from "react-calendar";

const Layout = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    useEffect(() =>{
        setIsLoggedIn( localStorage.getItem('loginToken') !== null);
    },[isLoggedIn])

    return (
        <div>
            <div className="fixed top-0 w-full z-50" id={"navbar"}>
                {isLoggedIn ? <NavbarLoggedIn setIsLoggedIn={setIsLoggedIn} /> : <Navbar />}
            </div>
            <div >
                {isLoggedIn ? (
                    <div className="flex" id={"allContent"}>
                        <div className="w-2/3 h-full" id={"dynamicContent"}>
                            <div className="h-full">
                                <Outlet context={[isLoggedIn, setIsLoggedIn]}/>
                            </div>
                        </div>
                        <div className="w-1/3  flex flex-col" id={"staticContent"}>
                            <div className="flex-1 mt-20" id={"newsFeed"}>Content B1</div>
                            <div className="flex-1 bg-custom-dark border border-white" id={"Calendar"}>
                                <Calendar
                                    className={"w-full mx-auto bg-indigo-950 h-full text-lg"}
                                ></Calendar>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="min-h-screen">
                        <Outlet context={[isLoggedIn, setIsLoggedIn]}/>
                    </div>
                )}
            </div>
        </div>
    );


}

export default Layout
