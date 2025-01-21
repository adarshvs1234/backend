import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { categoryTransactionAPI } from '../services/transactionServices'
import { useParams } from 'react-router-dom'

const Transaccategory = () => {

    const {id} = useParams()
console.log("id",id)

const {data,refetch} = useQuery({
    queryFn:()=>categoryTransactionAPI({id}),
    queryKey:["categorytransaction",id],

    refetchOnWindowFocus: true,
    staleTime: 30000 
    
 })

 console.log("data4",data)

  return (
    <div className="mt-1 bg-red-300 h-screen ml-1 mr-1">
    <div className="flex justify-center pt-2">
      <h1 className="text-center border-2 border-black rounded p-1 w-64 text-sm">Category </h1>
    </div>
    
    <br />

    <div className="flex justify-center">
      <table className="table-auto border-collapse border border-white text-left ml-1 mr-1 text-center">
      
          <tr>
          <th className="border-2 border-white px-9 py-1  hidden sm:table-cell">No</th>
          
            <th className="border-2 border-white px-9 py-1 xl:text-xl 2xl:text-xl">Transaction Type</th>
            <th className="border-2 border-white px-9 py-1 xl:text-xl 2xl:text-xl">Amount</th>
           
          </tr>
     
          
       
          {data?.map((category,index) => (

            <tr key={index}>
              <td   className="border-2 border-white px-1 py-1  hidden sm:table-cell ">{index+1}</td>
            <td  className="border-2 border-white px-1 py-1 xl:text-xl 2xl:text-xl">{category.transactionType}</td>
              <td   className="border-2 border-white px-1 py-1 xl:text-xl 2xl:text-xl">{category.categoryTransactions.amount}</td>
            </tr>
          ))}
       
      </table>
    </div>
  </div>

);
};

export default Transaccategory
