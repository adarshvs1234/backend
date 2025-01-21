import React from 'react'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {  ErrorMessage, Field, Form, Formik } from 'formik'
import { updateTransactionsAPI } from '../services/transactionServices'
import { useParams } from 'react-router-dom'




const AddTransaction = () => {

  const queryClent = useQueryClient()
  

  const {id} = useParams()
  console.log("params id",id)
   
    const validationSchema = Yup.object({

      newAmount: Yup.number().required('Amount is required'),
      newDescription: Yup.string().required('Description is required'),

      newTransactionType: Yup.string().required('Type is required'), 
    })



    const {mutateAsync,data} = useMutation({
        mutationFn:(data)=>updateTransactionsAPI(data,id),
        mutationKey:["updateTransaction"],
        
})
 
    

    
    const initialValues = {

      newAmount: '',
      newDescription: '',
      newTransactionType: '',
    }


    const handleSubmit = (values,{resetForm}) =>{
      
   
        mutateAsync(values)
        .then((data)=>{
        
              console.log("mydata",data)
              alert('Transaction updated successfully')
              queryClent.invalidateQueries()
            
    })
    resetForm()
    }
    
  return (

    <div className="flex justify-center items-center h-screen bg-rose-400 ">
    <div className="w-95 p-6 shadow-lg bg-white rounded-md text-center md:w-96 md:p-12  lg:w-97 lg:p-13">
      <h1 className="text-xs block text-center font-semibold md:text-base lg:text-lg " >Update Transaction</h1>
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
                  name="newAmount"
                  className="border w-full text-xs text-center mb-2"
                  placeholder="Enter amount"
                />
                  <ErrorMessage name="newAmount" component="div" className="text-red-500 text-xs" />
  
   </div>

           
   
              <div>
                <Field
                  type="text"
                  name="newDescription"
                  className="border w-full text-xs text-center mb-2"
                  placeholder="Enter description"
                />
               

               <ErrorMessage name="newDescription" component="div" className="text-red-500 text-xs" />
              </div>

<div className="text-xs mt-1 border border text-center w-full mb-3">
                <Field as="select" name="newTransactionType" className="border w-full text-xs text-center">
                  <option value="" disabled selected>
                    Select your transaction type
                  </option>
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                </Field>
                
                <ErrorMessage name="newTransactionType" component="div" className="text-red-500 text-xs" />
              </div>


    

<button type='submit' className='bg-stone-950 text-white rounded-full text-xs w-full  cursor-pointer' >Submit</button>

</Form>
</Formik>

<div>

    
    </div>    


</div>

</div>

  )
}

export default AddTransaction