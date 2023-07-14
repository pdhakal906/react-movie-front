import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'
import Sidebar from './Sidebar'


const RootLayout = () => {

  const [show, setShow] = React.useState(false);

  const generateDrawer = () => {
    setShow(!show);
  }

  return (
    <>
      <Header generateDrawer={generateDrawer} />
      {show && <Sidebar />}
      <div className='bg-red-500 min-h-screen'>

        <Outlet />
      </div>


      <Footer />
    </>
  )
}

export default RootLayout
