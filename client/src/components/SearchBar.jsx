import { useEffect, useState } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useContext';
import FilterMenu from './FilterMenu';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const [md, setMd] = useState(false);
    const { setSearch, setFilter } = useAuth();
    const [auto, setAuto] = useState([]);

    const { setId } = useAuth();

    const navigate = useNavigate();

    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        const ev = document.addEventListener('click', () => {
            setOpen(false);
            setAuto([]);
        })
        return () => {
            document.removeEventListener('click', ev);
        }
    }, [])

    const [open, setOpen] = useState(false);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        if (auto && auto.length > 0) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [auto])

    useEffect(() => {
        const checkDeviceWidth = () => {
            if (window.innerWidth < 768) {
                setMd(true);
            } else {
                setMd(false);
            }
        };
        checkDeviceWidth();
        window.addEventListener('resize', checkDeviceWidth);
        return () => window.removeEventListener('resize', checkDeviceWidth);
    }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/search/auto', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('jwt-t'),
                    'query': searchQuery
                }
            })
            setAuto(response.data);
        }
        fetchData();
    }, [searchQuery]);

    async function handleSearch() {
        if (md) {
            setFilter(null);
            setSearch(searchQuery);
        } else {
            navigate('/search/' + searchQuery);
            setSearch(null);
            setFilter(null);
        }
    }

    const handleOpenFilter = (e) => {
        e.stopPropagation();
        setFilterOpen(!filterOpen);
    };

    useEffect(() => {
        document.addEventListener('click', () => {
            setFilterOpen(false);
        })
        return () => {
            document.removeEventListener('click', () => {
                setFilterOpen(false);
            })
        }
    }, [])

    return (
        <div className="flex items-center justify-between p-2 border dark:border-none rounded-md shadow-md sm:w-full w-[300px] md:w-[500px] max-w-lg mb-10 relative dark:bg-gray-600">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown} // Added this line to listen for Enter key
                placeholder="Search..."
                className="w-full p-2 rounded-l-md border border-gray-300 focus:border-blue-500 dark:focus:border-blue-400 dark:text-black"
            />

            <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-600 border-2 dark:border-none  text-white py-2 px-4 rounded-r-md focus:outline-none"
            >
                Search
            </button>

            <button
                onClick={handleOpenFilter}
                className={`ml-2 ${filterOpen ? "bg-gray-200" : "bg-gray-100"} hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md border dark:border-none border-gray-300 focus:outline-none relative`}
            >
                Filter
                {filterOpen && <FilterMenu />}
            </button>

            {
                open && (
                    <div className="absolute z-50 bottom-0 left-0 right-0 translate-y-[100%] w-full bg-white dark:bg-gray-800 border dark:border-none rounded-md shadow-md mt-1">
                        {
                            auto.map((item, index) => (
                                <div onClick={() => {
                                    setId(item.id);
                                    setSearch(null);
                                    setSearchQuery('');
                                    setOpen(false);
                                    setAuto([]);
                                }} key={index} className="p-2 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    {item.name}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default SearchBar;
