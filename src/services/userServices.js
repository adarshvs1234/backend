import axios from "axios";
import { BASE_URL } from "../utls/urls";
import { getToken} from "../utls/cookiehandle";
axios.defaults.withCredentials = true


export const loginAPI = async(data)=>{
        console.log(data);
        
const response = await axios.post(`${BASE_URL}/user/signin`,data)
        console.log(response);
        
        return response.data
}

export const signAPI = async(data)=>{
        console.log("data",data);

        const response = await axios.post(`${BASE_URL}/user/register`,data)
        console.log(response.data);
        
        return response.data
}


export const changePasswordAPI  = async(data) =>{
        const token = getToken()
        console.log(token);
        
        console.log(data)
        const response = await axios.put(`${BASE_URL}/user/change_password`,data,{
                headers:{
                        Authorization:`Bearer ${token}`
                }
        })
        console.log(response)
        return response.data

}


        export const changeNameAPI = async(data) =>{
                
                const token = getToken()
                console.log("token",token)
        console.log("axios",data)
                const response = await axios.put(`${BASE_URL}/user/change_name`,data,{

                        headers:{
                                Authorization:`Bearer ${token}`
                        }
                })
                console.log(response.data)
                return response.data
                

                } 

