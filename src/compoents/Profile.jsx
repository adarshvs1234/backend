import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/authSlice'
import { useDispatch, useSelector} from 'react-redux'
import Cookies from 'js-cookie'
import Loginnavbar from './Loginnavbar'



const Profile = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()



  const user= useSelector((state)=>state.auth.user.name)
 console.log("presentuser",user) 

 
  const handleLogout = () =>{

    const confirmLogout = window.confirm("Do you want to logout?");

    if(confirmLogout){

  dispatch((logout()))

 Cookies.remove("userData")
  navigate('/login')
}

  }
 
return (


  <div className="text-center h-screen bg-red-300 flex items-center justify-center">
    <div className='text-center h-screen mt-1 bg-red-300 h-screen ml-1 mr-1  items-center justify-center '>

      
    <div className='bg-red-300 text-center mt-1 '>
      
        <div className='text-center '>

       
      <div  className='lg:text-xl pt-3 mb-4 font-serif hover:underline   pb-2'>Welcome {user}</div>
      
  
    <div>

    </div>
    
    <div className='mt-5 text-center border-2 border-white pt-2  sm:text-xl   pl-4 pr-4 hover:bg-red-200'>
      Do you want to change your username?<button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 ml-2  mt-1 sm:text-base  "  onClick={()=>navigate('/name')}>Change Username</button>
      
      {/* <button type='button' className='border border-black rounded ml-4' onClick={()=>navigate('/name')}>Change username</button> */}
    </div>
  
    </div>
    </div>
<br />
<br />
    <div className='border-2 border-white  pt-2  sm:text-xl  pl-4  pr-4 pb-1   hover:bg-red-200'>
    Do you want to change your password? <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 ml-2 mt-1  sm:text-base"  onClick={()=>navigate('/password')}>Change Password</button>
    
    {/* <button type='button' className='border border-black  form-control rounded  ml-4' onClick={()=>navigate('/password')}>Change password</button> */}

    
    </div>
    <br />
   

<br />
   {/* <button type='button' className='border border mt-9 rounded hover:bg-red-400  w-80 p-5'  onClick={handleLogout}>LOGOUT</button>  */}


   <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2   w-80 p-5  border border-dark  lg:text-lg"  onClick={handleLogout}>LOGOUT</button>
    </div>
 
    </div>
    
   )
}

export default Profile
