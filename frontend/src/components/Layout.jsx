import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {  Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import NavbarLoggedIn from "./NavbarLoggedIn";

const Layout = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    useEffect(() =>{
        setIsLoggedIn( localStorage.getItem('loginToken') !== null);
    },[isLoggedIn])

    return (
        <div>
            <div className="fixed top-0 w-full z-50">
                {isLoggedIn ? <NavbarLoggedIn setIsLoggedIn={setIsLoggedIn} /> : <Navbar />}
            </div>
            <section className="min-h-screen">
                <Outlet context={[isLoggedIn, setIsLoggedIn]} />
            </section>
        </div>
    );
}

export default Layout
