import { useContext } from "react";
import Context from "../context/ContextProvider";

const useAuth = () => {
    return useContext(Context);
}

export default useAuth;