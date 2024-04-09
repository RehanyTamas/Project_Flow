import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import AppConfig from "../config";
import axios from 'axios';



const Register = () => {

    let navigate = useNavigate();
    //const [isLoggedIn,setIsLoggedIn] = useState(false);

    /*useEffect(() => {
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
    }, [isLoggedIn,navigate]);*/

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');
    const [isButtonBusy, setIsButtonBusy] = useState(false);
    //const [data, setData] = useState(null);
    //const [errorVisibility, setErrorVisibility] = useState('invisible')
    //const [successVisibility, setSuccessVisibility] = useState('invisible')
    function clearInputs() {
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setCompany('')
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            setError('Passwords dont match');
            return;
        }

        setIsButtonBusy(true);

        const headers = {
            'Content-Type': 'application/json'
        }

        const userData = {
            username: username,
            company: company,
            email: email,
            password: password
        }

        axios.post(`${AppConfig.backendUrl}/api/register`, userData, {headers})
            .then(response => {
                clearInputs();
                //setData(data);
                //setSuccessVisibility('visible');
                console.log(response.data);
                navigate("/login")
                setTimeout(() => {
                    //setSuccessVisibility('invisible')
                }, 2500);
            })
            .catch(error => {
                //clearInputs();
                //setErrorVisibility('visible');
                console.log(error);
                setError(error)
                setTimeout(() => {
                    //setErrorVisibility('invisible');
                }, 2500);
            })
            .finally(() => {
               // setIsButtonBusy(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-custom-dark">
            <form
                className="container max-w-sm mx-auto flex-1 flex flex-col bg-transpart px-6 py-8 rounded shadow-md text-black"
                onSubmit={handleSubmit}>
                <h1 className="mb-8 text-3xl text-center text-white font-bold">Sign up</h1>
                <input
                    type="text"
                    className="block border w-full p-3 rounded mb-4 bg-indigo-950 text-white font-bold"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Username"
                />
                <input
                    type="text"
                    className="block border w-full p-3 rounded mb-4 bg-indigo-950 text-white font-bold"
                    id="company"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    placeholder="Company"
                />
                <input
                    className="block border w-full p-3 rounded mb-4 bg-indigo-950 text-white font-bold"
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
                    className="block border w-full p-3 rounded mb-4 bg-indigo-950 text-white font-bold"
                    name="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="block border w-full p-3 rounded mb-4 bg-indigo-950 text-white font-bold"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="z-20 w-full text-center py-3 rounded bg-transparent text-white font-bold focus:outline-none my-1 border border-transparent hover:border-white"
                    disabled={isButtonBusy}
                >
                    Create Account
                </button>
                <div className="text-gray-600 mt-6 text-center font-bold">
                    Already have an account?{' '}
                    <Link className="text-blue-600 hover:underline font-bold" to="../login/">
                        Login
                    </Link>
                    .
                </div>
            </form>
        </div>
    )
}

export default Register
