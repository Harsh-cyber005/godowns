import { Outlet} from "react-router-dom"
import Sidebar from "../components/Sidebar"
import useAuth from "../hooks/useContext"

function Dashboard() {
    const {opened} = useAuth()
    return (
        <div>
            <div className="text-white md:flex hidden">
                <Sidebar key={opened}/>
                <Outlet/>
            </div>
            <div className="md:hidden">
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard