import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {  Outlet } from 'react-router-dom'
import LogOutNavbar from './NavbarLogout'
import Navbar from './Navbar'

const Layout = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    useEffect(() =>{
        setIsLoggedIn( localStorage.getItem('loginToken') !== null);
    },[isLoggedIn])

    return (
        <div>
            {isLoggedIn ? <LogOutNavbar setIsLoggedIn={setIsLoggedIn}  /> : <Navbar/>}
            <section>
                <Outlet  context={[isLoggedIn, setIsLoggedIn]} />
            </section>
        </div>
    )
}

export default Layout
