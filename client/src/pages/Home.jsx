import { useState } from "react"
import Sidebar from "../components/Sidebar"
import useAuth from "../hooks/useContext"
import ItemsPage from "./ItemsPage"

function Home() {
    const [selected, setSelected] = useState('godowns')
    const {opened, search} = useAuth()

    return (
        <div >
            <div className="flex flex-col h-auto dark:text-white">
                <div className="flex w-full h-20 justify-center items-center bg-[#d2d2d4] dark:bg-[#273757]">
                    <button onClick={()=>{
                        setSelected("godowns")
                    }} className={`w-full h-full flex justify-center items-center  hover:bg-[#d2d2d4] dark:bg-[#192439] dark:hover:bg-[#273757] rounded-br-2xl ${selected == "godowns" ? "dark:bg-[#273757] bg-[#d2d2d4]":"bg-white"}`}>Godowns</button>
                    <button onClick={()=>{
                        setSelected("info")
                    }} className={`w-full h-full flex justify-center items-center  hover:bg-[#d2d2d4] dark:bg-[#192439] dark:hover:bg-[#273757] rounded-bl-2xl ${selected == "info" ? "dark:bg-[#273757] bg-[#d2d2d4]":"bg-white"}`}>Info</button>
                </div>
                <div className="h-full dark:bg-[#273757] bg-[#d2d2d4] w-full flex flex-col justify-start items-center">
                    {selected == "godowns"?<Sidebar key={opened}/>:<ItemsPage key={search}/>}
                </div>
            </div>
        </div>
    )
}

export default Home