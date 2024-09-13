import axios from "axios";

export const AxiosProvier = axios.create({
    baseURL: process.env.BACKEND_URL
});