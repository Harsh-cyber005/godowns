/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useContext";
import SearchBar from "../components/SearchBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

function InfoPage() {
    const { id, setOpened, setSearch } = useAuth();
    const [data, setData] = useState(null);

    const [run, setRun] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        setSearch(null);
        async function fetchData() {
            const response = await axios.get(`/test/item`, {
                headers: {
                    "token": `${localStorage.getItem('jwt-t')}`,
                    "id": id
                }
            });
            setData(response.data);
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        console.log("InfoPage rendered : ", id);
    },[])

    async function handleLocateProduct(id) {
        setOpened([]);
        const response = await axios.get('/finditem', {
            headers: {
                "token": `${localStorage.getItem('jwt-t')}`,
                "id": id
            }
        });
        const paths = response.data[1];
        paths.forEach((path) => {
            setOpened((prev) => {
                return [...prev, path.id];
            });
        });
        if(run){
            showToast();
        }
    }

    useEffect(() => {
        const checkDeviceWidth = () => {
            if (window.innerWidth < 640) {
                setRun(true);
            } else {
                setRun(false);
            }
        };
        checkDeviceWidth();
        window.addEventListener('resize', checkDeviceWidth);
        return () => window.removeEventListener('resize', checkDeviceWidth);
    }, []);


    const showToast = () => {
        toast.success('Item located, go to the godowns section to view it', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    };

    return (
        <div className="min-h-screen h-auto overflow-scroll overflow-x-hidden w-screen-auto text-gray-600 dark:text-white p-10 example">
            <div className="max-w-full flex items-center justify-center">
                <SearchBar />
            </div>
            <div>
                {data ? (
                    <div>
                        <div className="w-full flex justify-center items-center">
                            <img src={data.image_url} alt="item" className="h-[200px] max-w-screen object-contain rounded-lg shadow-lg mb-5" />
                        </div>
                        <div>
                            <div className="md:text-2xl text-xl font-bold">
                                {data.brand}
                            </div>
                            <div className="md:text-xl text-lg opacity-80 font-semibold mb-10">
                                {data.name}
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        handleLocateProduct(data.item_id);
                                    }}
                                    className="bg-green-500 hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800 text-black dark:text-white duration-200 p-1 rounded-full px-3 cursor-pointer"
                                >
                                    Locate Product
                                </button>
                            </div>
                            <span>&nbsp;</span>
                            <div>
                                <div className="text-lg font-serif dark:text-gray-400">
                                    * {data.category}
                                </div>
                                {data?.attributes?.type && <div className="text-lg font-serif dark:text-gray-400">
                                    * {data?.attributes?.type}
                                </div>}
                                {data?.attributes?.material && <div className="text-lg font-serif dark:text-gray-400">
                                    * Made out of High Quality {data?.attributes?.material} material
                                </div>}
                                {data?.attributes?.warranty_years && (
                                    <div className="text-lg font-serif dark:text-gray-400">
                                        * {data?.attributes?.warranty_years} year of warranty
                                    </div>
                                )}
                            </div>
                            <div className="w-full border-b-[1px] border-black dark:border-gray-400 mt-2 mb-5"></div>
                            <div className="md:text-2xl text-xl flex justify-start gap-7 items-center font-semibold text-black dark:text-white ml-5">
                                <div>
                                    <sup className="dark:text-gray-300 text-gray-600 font-light">$</sup>{data.price}
                                </div>
                                <div className="text-red-600 font-bold text-base md:text-xl">
                                    {data.status === "out_of_stock" ? "OUT OF STOCK" : null}
                                </div>
                                <div className="text-green-500 font-bold text-base md:text-xl">
                                    {data.status === "in_stock" ? "IN STOCK" : null}
                                </div>
                            </div>
                            <div className="w-full border-b-[1px] border-black dark:border-gray-400 mt-5 mb-5"></div>
                            <div onClick={() => navigator.clipboard.writeText(data.godown_id)} className="hidden md:flex md:justify-start md:items-center md:gap-3">
                                Godown ID : <span className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-950 dark:hover:bg-blue-800 text-black dark:text-white duration-200 p-1 rounded-full px-3 cursor-pointer">
                                    {data.godown_id}
                                </span>
                                <span>
                                    &nbsp;Click to copy
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loader/>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default InfoPage;
