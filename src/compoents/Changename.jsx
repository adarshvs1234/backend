import React, { useState } from 'react'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'

import {jwtDecode}  from 'jwt-decode'
import { userData } from '../utls/cookiehandle'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { userNameUpdate, userUpdate } from '../redux/authSlice'
import { changeNameAPI } from '../services/userServices'
import { ErrorMessage, Field, Form, Formik } from 'formik'

const Changename = () => {

        const dispatch = useDispatch()
  
//         const currentname = useSelector((state)=>state.auth.user)

// console.log("currentdata",currentname)


const validationSchema = Yup.object({

      newName : Yup.string().required("Username is required")     

    })


    const {mutateAsync} = useMutation({
        mutationFn:changeNameAPI,
        mutationKey:["changename"]
    })

const initialValues = {
 newName :""
}


const handleSubmit = async(values,{resetForm,setFieldError}) =>{
try{
const response = await mutateAsync(values);
 const data = jwtDecode(response);
 console.log("data",data)

 Cookies.set("userData", response, { expires: 1 })

dispatch(userNameUpdate(data),JSON.stringify(values));
alert("Username successfully changed")
resetForm()


}
  


catch (err) {
    console.error('Error:', err);
if (err.response) {
  

  const errorMessage = err.response.data.message || 'An error occurred';
  alert(errorMessage);


  if (err.response.data.fieldErrors) {
    const fieldErrors = err.response.data.fieldErrors;
    for (const field in fieldErrors) {
      setFieldError(field, fieldErrors[field]);
    }
  }
} else if (err.request) {
  
  alert('No response from server. Please try again later.');
} else {
  
  alert('An unexpected error occurred. Please try again.');
}
}
resetForm()
}


  return (

<>
<div className="flex justify-center items-center h-screen bg-red-400 shadow-lg  overflow-hidden ">
  <div className="w-78 h-64 p-8 shadow-lg bg-white rounded-md flex flex-col justify-between sm:w-96">
    <div className="text-xs text-center font-semibold md:text-base lg:text-xl ">
      Change Username
    </div>
<Formik
initialValues = {initialValues}
validationSchema = {validationSchema}
onSubmit = {handleSubmit}
resetForm>
<Form>

<div>
    <Field type="text" name="newName" className='text-xs border text-center w-full mt-4 pb-2'  placeholder='Enter username'/>
    <ErrorMessage name="newName" component="div"  className='text-red-500 text-xs'/>
</div>

<br />
<button type='submit' className='bg-stone-950 text-white rounded-full text-xs w-full  cursor-pointer py-2 mt-3'>Submit</button>

</Form>
</Formik>

<div>

    
    </div>    


</div>

</div>

</>  

  )
}

export default Changename
