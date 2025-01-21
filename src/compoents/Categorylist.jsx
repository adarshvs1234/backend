import { useMutation, useQuery} from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCategortyAPI, fetchCategoryAPI } from '../services/categoryServices';

const Categorylist = () => {
  const navigate = useNavigate();

   
    

  const { data, isError, isLoading,refetch } = useQuery({
    queryFn: fetchCategoryAPI,
    queryKey: ["categorylist"],
    

  
  });


  const {mutate,data:itemdata}= useMutation({

    mutationFn:deleteCategortyAPI,
    mutationKey:["categorydelete"],


    onSuccess: () => {
      refetch();
    },

  })


  if (isError) {
    return <div>Error occurred while fetching categories.</div>;
  }

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

 
  const handleclick = (key)=>{
    console.log(key);
    
    
    navigate(`/categorytrans/${key}`,)
  }



  //delete
    const deletehandle = (key)=>{

      
      console.log("tobedeleetd",key)
      mutate(key)



       
 }


  return (
    <div className="mt-1 bg-red-300 h-screen ml-1 mr-1">
      <div className="flex justify-center pt-2">
        <h1 className="text-center border-2 border-black rounded p-1 w-64 text-sm mt-2   xl:text-xl 2xl:text-xl  font-mono  md:text-base">Category List</h1>
      </div>
      <br />

      <div className="flex justify-center">
        <table className="table-auto border-collapse border border-white text-left ml-1 mr-1 border-2 mt-5">
        
            <tr>
              <th className="border-2 border-white px-9 py-1   xl:text-xl 2xl-text-xl ">Categories</th>
              <th  className='border border-white px-1 py-1 col-auto text-center   xl:text-xl 2xl-text-xl' >Delete</th>

            </tr>
       
         
            {data?.map((category) => (

              <tr key={category._id}>
                <td className="border-2 border-white px-1 py-1 cursor-pointer text-center  xl:text-xl 2xl-text-xl" onClick={()=>handleclick(category._id)}>{category.category}</td>
               <td  className=' xl:text-xl 2xl-text-xl'><button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  pl-3 pt-1 ml-2 pt-2 mt-1 pr-3 "   onClick={()=>deletehandle(category._id)}>X</button></td>


                {/* <td className='bg-red-500 cursor-pointer border-2 border-white rounded' onClick={()=>deletehandle(category._id)}>
                 Delete
                </td> */}

              </tr>
            ))}
         
        </table>
      </div>
    </div>

  );
};

export default Categorylist;
