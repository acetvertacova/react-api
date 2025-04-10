import axios from "axios";

const api = axios.create({
    baseURL: "https://67f7f21a2466325443eb595e.mockapi.io/api",
})

export default api;