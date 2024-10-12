import axios from "axios";
const BASE_URL = "https://godownsv.vercel.app/api/";

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