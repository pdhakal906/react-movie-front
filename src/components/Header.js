import { Button, Input } from '@material-tailwind/react';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Example from './Sidebar';

const Header = ({ generateDrawer }) => {

  const nav = useNavigate();

  const [show, setShow] = useState(false);

  const [hoveredLink, setHoveredLink] = useState(null);

  const [showSubMenu, setSubMenu] = useState(false);


  const handleButtonClick = () => {
    setShow(!show);
    generateDrawer();
  };


  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const isLinkHovered = (link) => {
    return hoveredLink === link;
  };
  const valSchema = Yup.object().shape({
    query: Yup.string().required("Type something to search")
  });

  const formik = useFormik({
    initialValues: {
      query: ''
    },

    onSubmit: (val, { resetForm }) => {
      nav(`/searchmovie/${val.query}`);
      resetForm();

    },

    validationSchema: valSchema

  })




  return (
    <header className='bg-[#032541] text-white flex justify-between px-4 py-2 items-center pt-5'>
      <div>
        <NavLink to="/"><h1 className='text-4xl font-bold mb-2 mr-5'>Movies</h1></NavLink>






      </div>

      <div>
        {formik.errors.query && formik.touched.query && <h1 className='text-red-500'>{formik.errors.query}</h1>}
        <form onSubmit={formik.handleSubmit} className='hidden sm:flex md:flex'>
          <input type="text"
            name='query'
            onChange={formik.handleChange}
            value={formik.values.query}
            className='w-[100px] h-[40px] p-1  py-2 px-3 border border-gray-300 rounded-l-md focus:outline-none text-black' />
          <button type="submit" className='bg-blue-500 w-[70px] rounded-r-md focus:outline-none'>Search</button>
        </form>
      </div>
      <button onClick={handleButtonClick}>
        {show ?

          <i className="fa-solid fa-xmark fa-2xl hidden sm:flex"></i> :
          <i className="fa-solid fa-bars fa-2xl hidden sm:flex" ></i>

        }</button>


      <nav className='sm:hidden space-x-10 flex  items-center'>
        <div className='relative' onMouseEnter={() => handleMouseEnter('movies')} onMouseLeave={handleMouseLeave}>
          <NavLink>Movies</NavLink>
          {isLinkHovered('movies') && <div className='absolute z-10 w-[150px] bg-white p-5 rounded-md text-black flex flex-col gap-1 '>
            <NavLink to="/movie/popular">Popular</NavLink>
            <NavLink to="/movie/upcoming">Upcomming</NavLink>
            <NavLink to="/movie/top_rated">Top Rated</NavLink>
          </div>}
        </div>

        <div className='relative' onMouseEnter={() => handleMouseEnter('tvShows')} onMouseLeave={handleMouseLeave}>
          <NavLink>Tv Shows</NavLink>
          {isLinkHovered('tvShows') && <div className='absolute z-20 w-[150px] bg-white p-5 rounded-md text-black flex flex-col gap-1 '>
            <NavLink to='/tv/popular'>Popular</NavLink>
            <NavLink to='/tv/airing_today'>Airing Today</NavLink>
            <NavLink to='/tv/on_the_air'>On Tv</NavLink>
            <NavLink to='/tv/top_rated'>Top Rated</NavLink>
          </div>}
        </div>



        {formik.errors.query && formik.touched.query && <h1 className='text-red-500'>{formik.errors.query}</h1>}
        <form onSubmit={formik.handleSubmit}>
          <div className='flex gap-2'>
            <Input

              type='search'
              color='white'
              label='Type a movie or tv show to search'
              name='query'
              onChange={formik.handleChange}
              value={formik.values.query}


            />

            <Button type='submit'>Search</Button>


          </div>
        </form>

      </nav>



    </header >
  )
}

export default Header
