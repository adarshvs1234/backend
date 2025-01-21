import React, { use } from 'react'
import * as Yup from 'yup'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { useDispatch, useSelector} from 'react-redux'
import { login } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import { useMutation } from '@tanstack/react-query'
import { loginAPI } from '../services/userServices'
import Cookies from 'js-cookie'




const Loginnavbar = () => {

 

const navigate = useNavigate()
const dispatch = useDispatch()

 
const validationSchema = Yup.object({

  email : Yup.string().email().required('email is required'),
  password : Yup.string()
              .min(3,'Password must be atleast 3 characters')
              .required('Password is required')

})


const {mutateAsync,isError,error} = useMutation({
  mutationFn: loginAPI,
  mutationKey: ["login"]
})

const initialValues = {

  email:'',
  password:'',
  rememberMe:false
  
} 

  const handleSubmit = async(values,{resetForm}) => {


    try{

      const token = await mutateAsync(values);

      const data = jwtDecode(token);
      Cookies.set("userData", token, { expires: 1 });
      dispatch(login(data),JSON.stringify(values));
      alert("Login successful");
      navigate('/')

    } catch (error) {
     
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
     

    }

    resetForm()

  }

return (

    <div className="flex justify-center items-center h-screen  bg-cyan-300 shadow-lg ">
     <div className="w-120 p-11 bg-white rounded-md md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.8)]">




      <h1 className='text-center pb-3'>Log In</h1>
  

  
  <Formik
        initialValues = {initialValues}
      validationSchema = {validationSchema}
      onSubmit = {handleSubmit}
      resetForm>



      {()=>(  
<Form>


{isError && (
    <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
      {error?.response?.data?.message || error?.message || 'Login failed. Please try again.'}
    </div>
  )}



<div className="mb-4">
<Field type='text' name='email'  className='text-xs border text-center w-full' placeholder="Enter email" />

<ErrorMessage name='email'  component='div' className="text-red-500 text-xs" />

</div>


<div className="mb-4">
  <Field  type='password'  name='password'   className="text-xs border text-center w-full" placeholder="Enter password"/>
  <ErrorMessage name='password' component="div" className="text-red-500 text-xs" />
</div>


<div className="flex items-center pt-4">
    <Field type="checkbox" name="rememberMe" className="mr-2" />
  <label className="text-xs">Remember me</label>
</div>


<div className="text-center mt-4">
<button type="submit" className="bg-stone-950 text-white rounded-full text-xs w-full  cursor-pointer" > Login</button>
</div>

</Form>
)}

</Formik>
    <br />
       
  <div className='text-xs pt-2'>
      Don't you have an account? <a href='/signup'  className="text-blue-600">Register</a>
    </div>
    </div>
    </div>

  )
}

export default  Loginnavbar

