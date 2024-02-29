import {Link, useNavigate, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import AppConfig from "../config";

const Login = () => {

    let navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useOutletContext();
    useEffect(() =>{
        if(isLoggedIn){
            navigate("/")
        }
    },[isLoggedIn])

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    //const [errorVisibility, setErrorVisibility] = useState('invisible')
    //const [successVisibility, setSuccessVisibility] = useState('invisible')

    function clearInputs() {
        setEmail('')
        setPassword('')
    }

    const HandleLogin = (event)=>{

        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };

        axios.post(`${AppConfig.backendUrl}/api/login`, requestOptions, { withCredentials: true })
            .then(() => {
                clearInputs();
                //setSuccessVisibility('visible');
                setTimeout(() => {
                    //setSuccessVisibility('invisible');
                    navigate('/');
                    setIsLoggedIn(true);
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
        <div className=''>
            <form className="bg-grey-lighter min-h-screen flex flex-col" onSubmit={HandleLogin}>
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Login</h1>
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
                            className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-500 focus:outline-none my-1">Login
                        </button>
                        <div className="text-grey-dark mt-6">
                            Doesn't have an account?
                            <Link class="no-underline border-b border-blue text-blue-600" to="../register/">
                                register
                            </Link>.
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )}

export default Login;