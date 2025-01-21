import React from 'react'
import Loginnavbar from '../compoents/Loginnavbar'
import { Provider } from 'react-redux'
import store from '../redux/Store'
// import { ReactQueryDevtools }  from '@tanstack/react-query-devtools'
// import { QueryClientProvider,QueryClient} from '@tanstack/react-query'




const Login = () => {
 

  return (
    <Loginnavbar/>

      
      

/* 
   <ReactQueryDevtools initialIsOpen/>
   {showDevTool && (

    <React.Suspense fallback={null}>
  <ReactQueryDevtools/>
    </React.Suspense>
   )} */
 
  )


}

export default Login
