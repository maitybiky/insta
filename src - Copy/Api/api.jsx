import axios from "axios";

const url = "http://localhost:3005/user"
export const getapi = async()=>{
    return await axios.get(`${url}`)
}