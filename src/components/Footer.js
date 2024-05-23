import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <footer className='bg-[#032541] h-[90px] text-white flex justify-between px-4 py-2 mt-5 items-center pt-5'>
        <div>
          <p> Made By Pratik Dhakal</p>

        </div>

        <div className='flex gap-5 '>
          <NavLink>About</NavLink>
          <NavLink>Faq</NavLink>
          <NavLink>Contact</NavLink>
        </div>

      </footer>

    </div>
  )
}

export default Footer
