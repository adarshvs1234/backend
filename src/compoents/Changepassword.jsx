import React from 'react';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup'
import { userPasswordUpdate, userUpdate } from '../redux/authSlice';
import { Mutation, useMutation } from '@tanstack/react-query';

import { changePasswordAPI } from '../services/userServices';
import { jwtDecode } from 'jwt-decode';
import { userData } from '../utls/cookiehandle';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie'


const ChangePassword = () => {


  const dispatch = useDispatch()
 

  
const {mutateAsync,isError,error} = useMutation({
  mutationFn : changePasswordAPI,
  mutationKey:["changepassword"],

  
})


  const initialValues = {
 password:'',
 confirmpassword:''
  }
     
 

  const validationSchema = Yup.object({

      password: Yup.string().required("Password required"),
      confirmpassword:Yup.string() 
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
                  .required('Confirm Password is required'),
    })




   const  handleSubmit= async(values,{resetForm,setFieldError})=>{

try{
    console.log("values",values)


const data = await mutateAsync(values);
    
    console.log("Response Data:", data);
console.log("values",values)

if(data.success){

  alert(data.message)
  dispatch(userPasswordUpdate(data));
 
  // resetForm()

}
  }catch (err) {
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

      // console.log("data password",data.password)
    // const data = jwtDecode(token)
    // console.log(data)
  // Cookies.set("userData",(token))


   
  return (
    <div className="flex justify-center items-center h-screen bg-red-400 shadow-lg">
  <div className="w-78 h-60 p-8 shadow-lg bg-white rounded-md flex flex-col justify-between sm:w-96">
    <div className="text-xs text-center font-semibold md:text-xs   lg:text-xl">
      Change Password
    </div>
     

<Formik 
initialValues={initialValues}
validationSchema = {validationSchema}
onSubmit = {handleSubmit}
resetForm>
<Form>


  
<div>
<Field type="password"  name="password"  className='text-xs border text-center w-full  mb-3' placeholder='Enter password'/>
<ErrorMessage name='password'  component='div' className="text-red-500 text-xs text-center" />
</div>

<div>
  <Field type="password" name="confirmpassword"   className='text-xs border text-center w-full' placeholder='Re-enter password'/>
  <ErrorMessage name='confirmpassword'  component='div' className="text-red-500 text-xs  text-center" />
</div>

<div>
  <br />
<button type='submit' className='bg-stone-950 text-white rounded-full text-xs w-full  cursor-pointer py-2 mt-3'>Submit</button>

</div>
  </Form>

</Formik>

</div>
{/* </Form> */}
     </div>
   
    // </div>

   
      
  );
};

export default ChangePassword;
