import React from 'react'

const Error = () => {
  return (
    <div className='h-screen bg-red-600 flex justify-center items-center text-white'>
      <div className='text-center'>
        <div className='underline underline-offset-8 mb-4 sm:text-lg xl:text-sm 2xl:text-xs'>
          The page you are looking for can't be found
        </div>
        <div className='text-4xl font-bold  sm:text-lg xl:text-xs 2xl:text-xs'>
          404
        </div>
      </div>
    </div>
  )
}

export default Error
