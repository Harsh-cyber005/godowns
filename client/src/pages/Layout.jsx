import { Outlet} from "react-router-dom"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout() {
    return (
        <>
            <Navbar/>
            <div className="w-full h-[64px]"></div>
            <Outlet />
            <Footer/>
        </>
    )
}

export default Layout