import React from 'react'
import { useNavigate } from 'react-router'

const NotFound = () => {

  const nav = useNavigate();

  return (
    <div className='h-[450px] w-[400px] mx-auto'>
      <h1 className='text-center'>Not Found</h1>
      <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_scqggbnw.json" background="transparent" speed="1" loop autoplay></lottie-player>
      <button onClick={() => nav("/")} className='w-full bg-black text-white hover:text-red-700'>Back to Home</button>
      {/* <button onClick={() => nav(-1)} className='w-full bg-black text-white hover:text-red-700'>Back to Home</button> */}
    </div>
  )
}

export default NotFound
