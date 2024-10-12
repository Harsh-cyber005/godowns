import { useEffect, useState } from 'react';
import sun from '../assets/sun.svg';
import moon from '../assets/moon.svg';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            setIsDarkMode(currentTheme === 'dark');
            document.documentElement.classList.toggle('dark', currentTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDarkMode ? 'dark' : 'light';
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-600 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-orange-300 duration-200"
        >
            <img src={isDarkMode?sun:moon} alt="show" className="h-6 w-6 cursor-pointer duration-200" />
        </button>
    );
};

export default ThemeToggle;
