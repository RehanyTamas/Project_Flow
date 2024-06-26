import {Link, useNavigate, useOutletContext} from "react-router-dom";
import React, {useEffect, useState} from "react";
import AppConfig from "../config";
import axios from 'axios';


const Login = () => {

    let navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useOutletContext();
    useEffect(() =>{
        if(isLoggedIn){
            navigate("/")
        }
    },[isLoggedIn, navigate])

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    //const [errorVisibility, setErrorVisibility] = useState('invisible')
    //const [successVisibility, setSuccessVisibility] = useState('invisible')

    function clearInputs() {
        setEmail('')
        setPassword('')
    }

    const handleLogin = (event)=>{

        event.preventDefault();

        const headers = {
            'Content-Type': 'application/json',
            withCredentials: true
        }

        const userData = {
            email: email,
            password: password
        }

        axios.post(`${AppConfig.backendUrl}/api/login`, userData, {
            headers: headers,
            withCredentials: true, // Move it here
        })
            .then(response => {
                clearInputs();
                localStorage.setItem("loginToken", response.data.loginToken);
                console.log('Token:', response.data.loginToken);
                setTimeout(() => {
                    //setSuccessVisibility('invisible');
                    setIsLoggedIn(true);
                    navigate('/');

                }, 1500);
            })
            .catch(error => {
                clearInputs();
                //setErrorVisibility('visible');
                console.log(error);
                setTimeout(() => {
                    //setErrorVisibility('invisible');
                }, 2500);
            });
    }

    return (
        <div className="bg-custom-dark min-h-screen flex items-center justify-center">
            <form className="container max-w-sm mx-auto flex-1 flex flex-col" onSubmit={handleLogin}>
                <div className="bg-transparent px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center text-white font-bold">Login</h1>
                    <input
                        className="block border border-gray-300 w-full p-3 rounded mb-4 bg-indigo-950 text-white font-bold"
                        placeholder="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="block border border-gray-300 w-full p-3 rounded mb-4 bg-indigo-950 text-white font-bold"
                        name="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="z-20 w-full text-center py-3 rounded bg-transparent text-white font-bold focus:outline-none my-1 border border-transparent hover:border-white"
                    >
                        Login
                    </button>
                    <div className="text-gray-600 mt-6 text-center font-bold">
                        Don't have an account?{' '}
                        <Link className="text-blue-600 hover:underline font-bold" to="../register/">
                            Register
                        </Link>
                        .
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;