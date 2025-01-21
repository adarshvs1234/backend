import React from 'react'
import { useNavigate } from 'react-router-dom'

const   Navbar = () => {

  const navigate = useNavigate()

  
  return (
    <>
    <div className='flex text-sm justify-between  pr-4 ' >

    <div className='font-semibold '>
        ExpTracker.
    </div >

     

     <div  className='cursor-pointer' onClick={()=> navigate('/alltransaction')}>
        Transactions
    </div>

   
    <div className='cursor-pointer'  onClick={()=>navigate('/categorylist')}>
        Category
    </div>


    <div className='cursor-pointer'  onClick={()=>navigate('/profile')}>
       Profile
    </div>



</div>
    <hr  />
    </>
  )
}

export default Navbar
