
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'



export const getToken = ()=>{
    return Cookies.get("userData")  
}

 export const userData = ()=>{
    return Cookies.get("userData")? jwtDecode(Cookies.get("userData")):null
} 


