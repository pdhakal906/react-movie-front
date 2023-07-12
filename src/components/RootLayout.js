import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'


const RootLayout = () => {
  return (
    <>
      <Header />
      <div className='min-h-screen'>

        <Outlet />
      </div>


      <Footer />
    </>
  )
}

export default RootLayout
