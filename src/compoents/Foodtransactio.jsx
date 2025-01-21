import React from 'react'
import { useNavigate } from 'react-router-dom'

const Foodtransactio = () => {
  

  const navigate = useNavigate()
  return (
    <div className='bg-red-300 h-screen'> 
    <div className='text-center'>
    Transaction
    </div>

<div className='flex justify-center' >
        
        
      <table className='table-auto border-collapse border border-gray-300  text-left ml-1 mr-1 mt-6'>
        <tr>
          <th className='border border-white px-1 py-1'>Date</th>
          <th className='border border-white px-1 py-1'>Amount</th>
            <th className='border border-white px-1 py-1'>Description</th>
          <th  className='border border-white px-1 py-1'>Type</th>
        </tr>

        <tr>
          <td  className='border border-white px-1 py-1'>1-12-2024</td>
         <td  className='border border-white px-1 py-1'>500</td>
        <td  className='border border-white px-1 py-1'>Dinner</td>
         <td  className='border border-white px-1 py-1'>Expense</td>
         <button type='button' className='border border-2' >Update</button>
   </tr>

        
       


      </table>
    </div>
    </div>
  )
}

export default Foodtransactio
