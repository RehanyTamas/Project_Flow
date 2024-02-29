import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {  Outlet } from 'react-router-dom'
import LogOutNavbar from './NavbarLogout'
import Navbar from './Navbar'

const Layout = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    useEffect(() =>{
        setIsLoggedIn( localStorage.getItem('userToken') !== null);
    },[isLoggedIn])

    return (
        <div>
            {isLoggedIn ? <LogOutNavbar isLoggedIn={isLoggedIn}  /> : <Navbar />}
            <section>
                <Outlet  context={[isLoggedIn, isLoggedIn]} />
            </section>
        </div>
    )
}

export default Layout
