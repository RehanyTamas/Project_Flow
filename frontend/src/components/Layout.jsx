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
            {isLoggedIn ? <NavbarLoggedIn setIsLoggedIn={setIsLoggedIn}  /> : <Navbar/>}
            <section>
                <Outlet  context={[isLoggedIn, setIsLoggedIn]} />
            </section>
        </div>
    )
}

export default Layout
