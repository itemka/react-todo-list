import axios from "axios";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {"API-KEY": "326adc8b-48be-4905-a33d-14875af1c491"}
});

export default instance;