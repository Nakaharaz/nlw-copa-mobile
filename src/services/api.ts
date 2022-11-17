import axios from "axios";

export const api = axios.create({
    baseURL: 'https://server-enzo-copa.herokuapp.com/'
});