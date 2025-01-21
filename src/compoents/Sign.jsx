import React from 'react'
import * as Yup from 'yup'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { signup } from '../redux/authSlice'
import Cookies from 'js-cookie'
import { userData } from '../utls/cookiehandle'
import { jwtDecode } from 'jwt-decode'
import { signAPI } from '../services/userServices'


const Sign = () => {

    const dispatch = useDispatch()

const validationSchema = Yup.object({

    username :  Yup.string().required('Username is required'),
    password : Yup.string()
                .min(3,'Password should have 3 characters')
                .required('Password is required'),
                                                                                                                                                                                                 
    email : Yup.string().email()
            .required('Email is required')
})


const initialValues = {

    username :'',
    email :'',
    password : ''

}

const {mutateAsync,isError,error} = useMutation({
  mutationFn: signAPI,
  mutationKey: ["sign"]
})

const handleSubmit = async (values, { resetForm, setFieldError }) => {
  try {
    console.log(values);

    const token = await mutateAsync(values);
    console.log(token);
    const data = jwtDecode(token);
    console.log(data);
    Cookies.set("userData", token);
    dispatch(signup(data));
    alert("You are successfully signed up");
    resetForm();
  } catch (err) {
    if (err.response && err.response.data.errors) {
      const { errors } = err.response.data;

      for (const field in errors) {
        setFieldError(field, errors[field]);
      }

      alert("User cannot be created with the entered credentials");
    } else {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again later.");
    }
  }
};



  return (

    <div className='flex justify-center items-center h-screen bg-cyan-300 shadow-lg '>
        <div className='w-15 max-w-lg p-6 shadow-lg bg-white rounded-md  sm:p-12 sm:w-full'>
     <h1 className='text-center text-xl font-semibold'>Sign Up</h1>
  
    <br />  

    <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        resetForm>

{()=>(

    <Form>
        <div>
            <Field type="text" name="username" className="text-xs border w-full p-2 mb-4 rounded" placeholder="Enter username" />

            <ErrorMessage name='username' component='div'  className='text-red-500 text-xs' />
        </div>


        <div>
        <Field type="text" name="email" className="form-control text-xs border w-full p-2 mb-4 rounded" placeholder="Enter email" />

        <ErrorMessage name='email' component='div' className='text-red-500 text-xs'/>
        </div>


        <div>
        <Field type="password" name="password" className="form-control text-xs border w-full p-2 mb-4 rounded" placeholder="Enter password"/>

        <ErrorMessage name='password' component='div' className='text-red-500 text-xs'/>
        </div>

        <div>
          <button type="submit" className="bg-stone-950 rounded w-full text-xs text-white p-2 hover:bg-stone-700">Register</button>
        </div>


    </Form>
)}

</Formik>
     
<div className='text-xs text-center mt-4'>
        Already signed up? <a href='/login' className="text-blue-600">Login</a> 
       </div>

   </div>
</div>


  )
}

export default Sign
