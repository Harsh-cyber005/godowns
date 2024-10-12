import useAuth from "../hooks/useContext"
import BasicSearch from "./BasicSearch"
import FilterSearch from "./FilterSearch"

function SearchPage() {
    const {filter} = useAuth()
    return (
        <>
            {
                !filter ? <BasicSearch/> : <FilterSearch/>
            }
        </>
    )
}

export default SearchPage