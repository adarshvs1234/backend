import React from 'react'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import {  postTransactionAPI } from '../services/transactionServices'




const AddTransaction = () => {
  
      const queryClent = useQueryClient()
   
    const validationSchema = Yup.object({

      amount: Yup.number().required('Amount is required'),

      category: Yup.string().required('Category is required'),

      description: Yup.string().required('Description is required'),

      transactionType: Yup.string().required('Transaction type is required'), 
    })

    const {mutateAsync} = useMutation({
        mutationFn:postTransactionAPI,
        mutationKey:["addTransaction"]
    })
 
    const initialValues = {

      amount: '',
      category: '',
      description: '',
      transactionType: '',
    }


    const handleSubmit = (values,{resetForm}) =>{
      console.log("hi");
      
      console.log(values)
         
        mutateAsync(values)
        .then((data)=>{

        console.log(data)
        alert("Transaction added successfully")
        queryClent.invalidateQueries()
        
      //dispatch(addtransaction(data))   
      })
      resetForm();
    }

  return (

    <div className="flex justify-center items-center h-screen bg-red-400 shadow-lg">
  <div className="w-96 h-66  p-7 shadow-lg bg-white rounded-md flex flex-col justify-between">
    <div className="text-sm text-center font-semibold">
     Add Transaction
    </div>
     
      <br />


<Formik
initialValues = {initialValues}
validationSchema = {validationSchema}
onSubmit = {handleSubmit}
resetForm>
<Form>


<div>
      <Field
                  type="number"
                  name="amount"
                  className="border w-full text-xs text-center   mb-2"
                  placeholder="Enter amount"
                />
   <ErrorMessage name="amount" component="div" className="text-red-500 text-xs text-center " />
   </div>


   
   <div>
      <Field
                  type="text"
                  name="category"
                  className="border w-full text-xs text-center  mb-2"
                  placeholder="Enter category"
                />
                <ErrorMessage name="category" component="div" className="text-red-500 text-xs  text-center" />
              </div>



              <div>
                <Field
                  type="text"
                  name="description"
                  className="border w-full text-xs text-center   mb-2"
                  placeholder="Enter description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-xs   text-center"
                />
              </div>




              <div className="text-xs mt-1 border border text-center w-full">
                <Field as="select" name="transactionType" className="border w-full text-xs text-center  mb-2">
                  <option value="" disabled selected>
                    Select your transaction type
                  </option>
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                </Field>
                <ErrorMessage name="transactionType" component="div" className="text-red-500 text-xs text-center" />
              </div>

  <button type='submit' className='bg-stone-950 text-white rounded-full text-xs w-full  cursor-pointer py-1 mt-3'>Submit</button>


</Form>
</Formik>

<div>

    
    </div>    


</div>

</div>

       

  )
}

export default AddTransaction