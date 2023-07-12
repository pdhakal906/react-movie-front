import { Button, Input } from '@material-tailwind/react';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const Header = () => {

  const nav = useNavigate();

  const [show, setShow] = useState(false);

  const [hoveredLink, setHoveredLink] = useState(null);

  const [showSubMenu, setSubMenu] = useState(false);





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
    <header className='bg-[#032541] text-white flex justify-between px-4 py-2 items-baseline pt-5'>
      <div>
        <NavLink to="/"><h1 className='text-3xl font-bold mb-2 mr-5'>Movies</h1></NavLink>



        {show && <nav className='hidden sm:flex flex-col space-y-2'>

          <p>Movies</p>
          <p>Tv Shows</p>
        </nav>
        }


      </div>


      <button onClick={() => setShow(!show)}>
        {show ?

          <i className="fa-solid fa-xmark hidden sm:flex"></i> :
          <i className="fa-solid fa-bars hidden sm:flex" ></i>

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
              label='Type a movie to search'
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
