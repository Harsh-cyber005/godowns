import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useContext';
import axios from '../api/axios';
import godowns from "../assets/godowns.jpg";
import show from "../assets/show.svg";
import hide from "../assets/hide.svg";

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
    const { signin } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const location = useLocation();

    useEffect(() => {
        const { user } = location.state || {};
        if (user) {
            setUsername(user);
            notifySuccess('Signup successful, please login');
        }
    }, [location.state])

    const [visibility, setVisibility] = useState(hide);

    useEffect(() => {
        if (username) {
            document.getElementById('floating-label-1').classList.add('floated-input')
        } else {
            document.getElementById('floating-label-1').classList.remove('floated-input')
        }
    }, [username])

    useEffect(() => {
        if (password) {
            document.getElementById('floating-label-2').classList.add('floated-input')
        } else {
            document.getElementById('floating-label-2').classList.remove('floated-input')
        }
    }, [password])

    const navigateAfterLogin = () => {
        const timeout = setTimeout(() => {
            navigate('/');
            clearTimeout(timeout);
        }, [2000])
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await axios.post("/auth/signin",
            JSON.stringify({ username: username, password: password }),
            {
                headers: { 'Content-Type': 'application/json' },
                validateStatus: function (status) {
                    return status < 501;
                }
            }
        );

        if (response.status === 200) {
            signin(response.data.token);
            navigateAfterLogin();
        }
        else if (response.status === 400) {
            notifyError(response.data.message);
        }
        else {
            notifyError(response.data.message);
        }
    };

    const handleChangeVisibility = () => {
        if (visibility === show) {
            setVisibility(hide);
            document.getElementById('floating-input-2').type = 'password';
        } else {
            setVisibility(show);
            document.getElementById('floating-input-2').type = 'text';
        }
    }

    const notifyError = (message) => toast.error(message);
    const notifySuccess = (message) => toast.success(message);

    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-[1000px] md:min-h-screen h-screen bg-gray-100 dark:bg-gray-900">
            <div className="md:w-[50%] h-full w-full">
                <img src={godowns} alt="godowns" className="h-full object-cover md:max-w-full w-full" />
            </div>
            <div className="flex items-center justify-center md:w-[50%] w-full h-full md:h-full">
                <div className="w-full max-w-[20rem] lg:max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Welcome Back !</h2>
                    <div className='relative'>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id='floating-input-1'
                            className="w-full border p-2 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-white placeholder-gray-400"
                        />
                        <label id='floating-label-1' className="absolute bg-white dark:bg-[#374151] text-gray-400 top-[50%] translate-y-[-50%] left-2 pointer-events-none duration-200">Username</label>
                    </div>
                    <div className='relative'>
                        <input
                            type="password"
                            value={password}
                            id='floating-input-2'
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-white placeholder-gray-400"
                        />
                        <label id='floating-label-2' className="absolute bg-white dark:bg-[#374151] text-gray-400 top-[50%] translate-y-[-50%] left-2 pointer-events-none duration-200">Password</label>
                        <button onClick={handleChangeVisibility} className='absolute right-2 top-[50%] translate-y-[-50%] h-6 w-6 cursor-pointer'>
                            <img src={visibility} alt="show" className="h-6 w-6 cursor-pointer hover:opacity-80" />
                        </button>
                    </div>
                    <button
                        onClick={handleLogin}
                        className="w-full p-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-400"
                    >
                        Sign In
                    </button>
                    <div>
                        <p className="text-center text-gray-600 dark:text-gray-400">Don&apos;t have an account? <span onClick={() => navigate('/signup')} className="text-blue-600 cursor-pointer dark:text-blue-400 hover:text-blue-950 dark:hover:text-blue-300">Sign Up</span></p>
                    </div>
                </div>
            </div>
            <ToastContainer position='bottom-right' />
        </div>
    );
};

export default Signin;
