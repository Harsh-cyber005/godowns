import axios from "axios";
const BASE_URL = "https://localhost:3000/api";

const token = localStorage.getItem('jwt-t');

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'token': token
    }
});