
import axios from "axios";
import { BASE_URL } from "../utls/urls";
import { getToken } from "../utls/cookiehandle";

 export const fetchTransactionAPI = async (data) => {

        const token = getToken()
        console.log("token",token)
                
        console.log("get")
const response = await axios.get(`${BASE_URL}/transaction/get`,{
        params:data,
        headers:{
                Authorization:`Bearer ${token}`
        }

});
console.log("get")
return response.data;
};


 export const deleteOneTransactionAPI = async(itemdata)=>{

        const token = getToken()
        console.log(token)
        console.log("Delete transac id",itemdata)
 const response = await axios.delete(`${BASE_URL}/transaction/deleteone/${itemdata.id}`,{
                        
        headers:{
                Authorization:`Bearer ${token}`
        }
        })
console.log("kello");

 return response.data
 }


export const postTransactionAPI = async(data) =>{
        
    const token = getToken()
    console.log(token)

    const response = await axios.post(`${BASE_URL}/transaction/transaction`,data,{

            headers:{
                    Authorization:`Bearer ${token}`
            }
    })
    console.log("resonspe",response)
    return response.data


    } 


export const categoryTransactionAPI = async({data,id}) =>{
        console.log("data",data);
        
        const token = getToken()
        console.log(token)

                console.log("idcate",id)
                
                
        const response = await axios.get(`${BASE_URL}/category/category_transaction/${id}`,{
                
                params:data,
                headers:{
                        Authorization:`Bearer ${token}`
                }
        })
        
        console.log("response",response.data);
        
        return response.data
        
        }
        

    
export const fetchAmountTransactionAPI = async({data})=>{

       const token = getToken()
       console.log("ji")
        console.log("ki",token)
        
        const response = await axios.get(`${BASE_URL}/transaction/summary`,{
                
                params:data,
                headers:{
                        Authorization:`Bearer ${token}`
                }
        })
        console.log("fetchdata",data)
        console.log("response",response.data);
        
        return response.data
}



export const deleteAllTransactionsAPI = async(itemdata) =>{

        console.log("Delete id",itemdata)
        
        const token = getToken()
        console.log(token)
    
     
        const response = await axios.delete(`${BASE_URL}/transaction/delete_category`, {
                        
                headers:{
                        Authorization:`Bearer ${token}`
                }
        })

       
console.log(response.data)


return response.data
}




//update API
export const updateTransactionsAPI = async(data,id)=>{


        
        const token = getToken()
        console.log(token)
       
        
       console.log("Update data",data)
       console.log("update id",id)
        const response = await axios.put(`${BASE_URL}/transaction/${id}`, data,{
                        
                headers:{
                        Authorization:`Bearer ${token}`
                }
        })
        console.log("update")   
console.log(response.data)

return response.data
}