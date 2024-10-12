/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const Context = createContext({});

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem('jwt-t') || null;
    });

    const [id, setId] = useState("63b412e2aa2e4bfdb072dcf871ed84c4");

    const [opened, setOpened] = useState([]);

    const [search, setSearch] = useState(null);

    const [filter, setFilter] = useState(null);

    const signin = (jwtToken) => {
        localStorage.setItem('jwt-t', jwtToken);
        setToken(jwtToken);
    };

    const logout = () => {
        localStorage.removeItem('jwt-t');
        setToken(null);
    };

    return (
        <Context.Provider value={{ token, setToken, signin, logout, id, setId, opened, setOpened, search, setSearch, filter, setFilter }}>
            {children}
        </Context.Provider>
    );
};

export default Context;