import axios from "axios"
import { getToken } from "../utls/cookiehandle"
import { BASE_URL } from "../utls/urls"

export const fetchCategoryAPI = async(data) =>{
       
    const token = getToken()
    
    console.log("token",token)
    
   
const response = await axios.get(`${BASE_URL}/category/categorylist`,{
        params:data,
        headers:{
                Authorization:`Bearer ${token}`
        }
})

console.log("hi11 ")


console.log("response",response.data);

return response.data

}



export  const deleteCategortyAPI = async(itemdata) =>{

        console.log("Delete id",itemdata)
        
        const token = getToken()
        console.log(token)
    
     
        const response = await axios.delete(`${BASE_URL}/category/delete_category/${itemdata}`, {
                        
                headers:{
                        Authorization:`Bearer ${token}`
                }
        })

       
console.log(response.data)


return response.data
}
