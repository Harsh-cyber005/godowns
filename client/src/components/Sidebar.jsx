/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import axios from "../api/axios";
import chevright from "../assets/chevright.svg";
import chevrightlight from "../assets/chevrightlight.svg";
import folder from "../assets/folder.svg";
import folderlight from "../assets/folderlight.svg";
import folderopen from "../assets/folderopen.svg";
import folderopenlight from "../assets/folderopenlight.svg";
import file from "../assets/file.svg";
import filelight from "../assets/filelight.svg";
import useAuth from "../hooks/useContext";
import { useNavigate } from "react-router-dom";

import SidebarLoader from "./SidebarLoader";

function Sidebar() {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/gs/combine", {
                headers: { "token": `${localStorage.getItem('jwt-t')}` }
            });
            setData(response.data);
            setLoaded(true);
        }
        fetchData();
    }, [])
    return (
        !loaded ? <SidebarLoader /> : 
        (
            <div className="h-auto max-h-screen md:pt-5 dark:bg-[#4C5057] bg-[#D2D2D4] min-w-[250px] w-full md:w-[550px] overflow-scroll dark:text-gray-300 text-gray-800 overflow-x-hidden scrollbar-custom">
                {
                    data.map((node) => (
                        <Node key={node.id} {...node} level={0} />
                    ))
                }
            </div>
        )
    );
    
}

const Node = (props) => {
    const { id, setId, opened} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const node = props;
    const level = node.level;
    const name = node.name;
    const childrenArray = node.children;
    const len = childrenArray.length;
    const items = node.items;
    const lenItems = items.length;

    const [run, setRun] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(opened.includes(node.id)){
            setIsOpen(true);
        }
    },[opened, node.id])

    let color;
    let padding;
    let itempadding;
    if (level === 0) {
        color = "dark:bg-[#4C5057] bg-[#D2D2D4]";
        padding = "pl-4";
        itempadding = "pl-10";
    } else if (level === 1) {
        color = "dark:bg-[#393C41] bg-[#DBDCDE]";
        padding = "pl-7";
        itempadding = "pl-14";
    } else if (level === 2) {
        color = "dark:bg-[#313439] bg-[#ECEDEE]";
        padding = "pl-10";
        itempadding = "pl-16";
    } else if (level === 3) {
        color = "dark:bg-[#313439] bg-[#FFFFFF]";
        padding = "pl-14";
        itempadding = "pl-20";
    } else if (level === 4) {
        color = "dark:bg-gray-400 bg-[#FFFFFF]";
        padding = "pl-18";
        itempadding = "pl-22";
    } else {
        color = "dark:bg-gray-300 bg-[#FFFFFF]";
        padding = "pl-20";
        itempadding = "pl-24";
    }

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const checkDeviceWidth = () => {
            if (window.innerWidth < 768) {
                setRun(true);
            } else {
                setRun(false);
            }
        };
        checkDeviceWidth();
        window.addEventListener('resize', checkDeviceWidth);
        return () => window.removeEventListener('resize', checkDeviceWidth);
    }, []);

    return (
        <li className={`list-none w-full overflow-x-hidden whitespace-nowrap text-ellipsis ${color}`}>
            <div
                className={`${padding} min-h-[50px] p-4 flex justify-start items-center shadow-2xl gap-2 cursor-pointer`}
                onClick={toggleOpen}
            >
                <img
                    src={chevright}
                    alt="toggle"
                    className={`h-4 w-4 cursor-pointer transform transition-transform duration-200 hidden dark:flex ${isOpen ? "rotate-90" : ""}`}
                />
                <img
                    src={chevrightlight}
                    alt="toggle"
                    className={`h-4 w-4 cursor-pointer transform transition-transform duration-200 flex dark:hidden ${isOpen ? "rotate-90" : ""}`}
                />
                <img
                    src={isOpen ? folderopen : folder}
                    alt="toggle"
                    className={`h-4 w-4 cursor-pointer transform transition-transform duration-200 hidden dark:flex`}
                />
                <img
                    src={isOpen ? folderopenlight : folderlight}
                    alt="toggle"
                    className={`h-4 w-4 cursor-pointer transform transition-transform duration-200 flex dark:hidden`}
                />
                <span className="w-[90%] overflow-x-hidden whitespace-nowrap text-ellipsis">{name}</span>
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out`}
                style={{ height: isOpen ? "auto" : "0" }}
            >
                {lenItems > 0 && (
                    <ul>
                        {items.map((item) => (
                            <li
                                id={item.item_id}
                                key={item.item_id}
                                className={`list-none w-full overflow-hidden text-ellipsis dark:bg-[#292c30] bg-[#FFFFFF] ${item.status === "out_of_stock" ? "bg-red-300 line-through dark:bg-red-600" : ""} min-h-[50px] flex justify-start items-center p-4 ${itempadding} underline ${id === item.item_id ? "bg-blue-300 dark:bg-blue-700" : ""} cursor-pointer hover:bg-gray-400 hover:dark:bg-gray-400`}
                                onClick={() => {
                                    if(!run){
                                        navigate(`/${item.item_id}`);
                                    }
                                    setId(item.item_id)
                                }}
                            >
                                <img
                                    src={filelight}
                                    alt="toggle"
                                    className={`h-4 w-4 cursor-pointer transform transition-transform duration-200 hidden dark:flex mr-2`}
                                />
                                <img
                                    src={file}
                                    alt="toggle"
                                    className={`h-4 w-4 cursor-pointer transform transition-transform duration-200 flex dark:hidden mr-2`}
                                />
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}
                {len > 0 && (
                    <ul>
                        {childrenArray.map((child) => (
                            <Node key={child.id} {...child} level={level + 1} />
                        ))}
                    </ul>
                )}
            </div>
        </li>
    );
};


export default Sidebar