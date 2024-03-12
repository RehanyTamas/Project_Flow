import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import AppConfig from "../config";
import axios from 'axios';



const Register = () => {

    let navigate = useNavigate();
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkAuth(){
            try{
                await axios.get(`${AppConfig.backendUrl}/api/check-auth`, {withCredentials: true});
                setIsLoggedIn(true);
                navigate("/");
            }catch (error){
                setIsLoggedIn(false);
            }
        }

        checkAuth();
    }, [isLoggedIn,navigate]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    //const [data, setData] = useState(null);
    //const [errorVisibility, setErrorVisibility] = useState('invisible')
    //const [successVisibility, setSuccessVisibility] = useState('invisible')
    function clearInputs() {
        setUsername('')
        setEmail('')
        setPassword('')
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, company: company, password: password, email: email })
        };

        axios.post(`${AppConfig.backendUrl}/api/register`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                clearInputs();
                //setData(data);
                //setSuccessVisibility('visible');
                setTimeout(() => {
                    //setSuccessVisibility('invisible')
                }, 2500);
            })
            .catch(error => {
                clearInputs();
                //setErrorVisibility('visible');
                console.log(error);
                setTimeout(() => {
                    //setErrorVisibility('invisible');
                }, 2500);
            });
    };


    return (
        <div className=''>

            <form className="bg-grey-lighter min-h-screen flex flex-col" onSubmit={handleSubmit}>
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Username"/>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            id="company"
                            name="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            placeholder="Company"/>
                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4"
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
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-500 focus:outline-none my-1">Create
                            Account
                        </button>
                        <div className="text-grey-dark mt-6">
                            Already have an account?
                            <Link class="no-underline border-b border-blue text-blue-600" to="../login/">
                                Log in
                            </Link>.
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Register
