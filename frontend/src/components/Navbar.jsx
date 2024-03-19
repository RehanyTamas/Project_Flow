import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    let navigate = useNavigate();

    function handleClick(path){
        navigate(path)
    }
    return (
    <header className={"bg-gray-100"}>
        <nav className={"bg-gray-100"}>
            <div>
                <h1 onClick={() => handleClick('/')}
                    className={"bg-gray-100"}>Project Flow</h1>
            </div>
            <div>
                <h1 onClick={() => handleClick('/login')}> Login</h1>
            </div>
            <div>
                <h1 onClick={() => handleClick('/register')}>Register</h1>
            </div>
        </nav>
        <div className={"w-16"}>H1</div>
    </header>
)
}

export default Navbar
