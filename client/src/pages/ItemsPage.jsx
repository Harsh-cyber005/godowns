import { useEffect } from "react";
import useAuth from "../hooks/useContext"
import InfoPage from "./InfoPage";
import SearchPage from "./SearchPage";

function ItemsPage() {
    const { search } = useAuth();
    useEffect(()=>{
        console.log("ItemsPage rendered : ",search)
    },[])
    return (
        <div className="md:hidden">
            {
                search ? 
                    <SearchPage/>
                    : <InfoPage/>
            }
        </div>
    )
}

export default ItemsPage