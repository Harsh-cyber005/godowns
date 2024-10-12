import { useEffect, useState } from "react";
import useAuth from "../hooks/useContext";
import axios from "../api/axios";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

function SearchPage() {
    const { search, setId, setSearch } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (search) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await axios.get('/search/basic', {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': localStorage.getItem('jwt-t'),
                            'query': search
                        }
                    });
                    setData(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [search]);

    return (
        <div className="max-h-screen overflow-scroll w-full flex justify-center items-start gap-4 flex-wrap sm:p-10 px-1 py-10 overflow-x-hidden example text-black dark:text-white">
            <div className="w-full flex items-center justify-center">
                <SearchBar />
            </div>
            {loading ? (
                <Loader />
            ) : (
                data.length > 0 ? (
                    data.map((item) => (
                        <div
                            onClick={() => {
                                setId(item.id);
                                setSearch('');
                            }}
                            key={item.id}
                            className="w-[150px] text-gray-200 rounded-lg max-h-min hover:scale-110 duration-200 cursor-pointer"
                        >
                            <div className="p-2">
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-[150px] h-[150px] object-cover shadow-lg mb-5"
                                    onError={(e)=>{
                                        e.target.onerror = null;
                                        e.target.src = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
                                    }}
                                />
                            </div>
                            <div className="h-[20px] p-2 flex justify-start items-center text-black dark:text-gray-200">
                                <div className="text-xs opacity-80 font-semibold mb-10 whitespace-nowrap text-ellipsis overflow-hidden">
                                    {item.name}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-start h-full w-full text-center p-10">
                        <div className="mb-5">
                            <svg
                                className="w-20 h-20 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12h6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-400">No Results Found</h2>
                        <p className="text-gray-500 mt-2">
                            Sorry, we couldn&apos;t find any matching items. Try a different search term.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
                        >
                            Reset Search
                        </button>
                    </div>
                )
            )}
        </div>
    );
}

export default SearchPage;
