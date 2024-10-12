import ItemsPage from "./ItemsPage"
import useAuth from "../hooks/useContext"

function ItemsDesktop() {
    const {search} = useAuth()
    return (
        <div className="hidden md:flex h-screen w-[250%]">
            <ItemsPage key={search} />
        </div>
    )
}

export default ItemsDesktop