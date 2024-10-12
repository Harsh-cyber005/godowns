/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import logolight from "../assets/logolight.png"

function Logo({s}) {
    const navigate = useNavigate()
    return (
        <div onClick={() => {
            navigate("/", { replace: true })
        }} className={`cursor-pointer hover:opacity-75 duration-200 min-w-max ${s} font-bold`}>Stark&nbsp;<span className="text-sky-500">Storage</span>&nbsp;Solutions</div>
    )
}

export function imgLogo() {
    return (
        <div>
            <img src={logo} alt="logo" className="h-16 w-16 dark:flex hidden dark:md:hidden" />
            <img src={logolight} alt="logo" className="h-16 w-16 dark:hidden flex md:hidden" />
        </div>
    )
}

export default Logo