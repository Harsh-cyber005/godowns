import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { imgLogo } from './Logo';
import ToggleTheme from './ToggleTheme';
import down from '../assets/down.svg';
import useAuth from '../hooks/useContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, token } = useAuth();

    document.addEventListener('click', () => {
        setIsOpen(false)
    })

    return (
        <nav className="bg-[white] dark:bg-[#192439] text-black dark:text-white py-1 md:py-3 fixed top-0 w-full z-[99999] flex items-center justify-center shadow-2xl">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <div className="w-full flex items-center md:justify-start justify-center mr-4 ml-4">
                        <Logo s="hidden md:flex md:text-xl" />
                        {imgLogo()}
                    </div>
                </div>
                <div className="hidden md:flex md:justify-center md:items-center space-x-16 mr-6 text-base font-semibold">
                    <Link to="#" className="hover:opacity-65 duration-200">Home</Link>
                    <Link to="#" className="hover:opacity-65 duration-200">About</Link>
                    <Link to="#" className="hover:opacity-65 duration-200 ">Contact</Link>
                    {token && <div onClick={() => {
                        logout()
                    }} className='hover:opacity-65 duration-200 cursor-pointer'>Logout</div>}
                </div>
                <div className="md:hidden flex gap-5 justify-center items-center dark:text-white text-black">
                    <ToggleTheme />
                    <button onClick={(e) => {
                        e.stopPropagation()
                        setIsOpen(!isOpen)
                    }} className="focus:outline-none mr-5 relative p-2 rounded-full bg-gray-600 hover:bg-gray-400">
                        <img src={down} alt="show" className={`h-6 w-6 cursor-pointer duration-200 flex ${isOpen ? "rotate-180" : ""} duration-200`} />
                        {isOpen && <div className='absolute bottom-0 right-0 translate-y-[105%] w-[180px] shadow-2xl flex flex-col items-end pointer-events-none bg-gray-200 dark:bg-[#22304a] rounded-lg'>
                            <Link to="#" className="w-full h-[50px] flex items-center justify-center p-2 bg-gray-200 dark:bg-[#22304a] text-center hover:bg-blue-400 dark:hover:bg-blue-400 duration-200 pointer-events-auto rounded-tl-lg rounded-tr-lg">Home</Link>
                            <Link to="#" className="w-full h-[50px] flex items-center justify-center p-2 bg-gray-200 dark:bg-[#22304a] text-center hover:bg-blue-400 dark:hover:bg-blue-400 duration-200 pointer-events-auto ">About</Link>
                            <Link to="#" className="w-full h-[50px] flex items-center justify-center p-2 bg-gray-200 dark:bg-[#22304a] text-center hover:bg-blue-400 dark:hover:bg-blue-400 duration-200 pointer-events-auto">Contact</Link>
                            {token && <div onClick={() => {
                                logout()
                            }} className='cursor-pointer w-full h-[50px] flex items-center justify-center p-2 bg-gray-200 dark:bg-[#22304a] text-center hover:bg-blue-400 dark:hover:bg-blue-400 duration-200 pointer-events-auto rounded-b-lg'>Logout</div>}
                        </div>}
                    </button>
                </div>
            </div>
            <div className='hidden md:flex mr-8'>
                <ToggleTheme />
            </div>
        </nav>
    );
};

export default Navbar;
