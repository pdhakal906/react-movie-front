import React from 'react'
import { useNowPlayingQuery } from '../features/movieApi'

import MovieShow from '../components/MovieShow';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as Yup from 'yup'



const HomePage = () => {
  const { data, isLoading, isError, error } = useNowPlayingQuery();

  const nav = useNavigate();

  const valSchema = Yup.object().shape({
    query: Yup.string().required("Type something to search")
  });


  const formik = useFormik({
    initialValues: {
      search: ''
    },

    onSubmit: (val, { resetForm }) => {
      nav(`/searchmovie/${val.search}`)
    },

    validationSchema: valSchema
  })

  return (
    <>
      <div className='p-5 bg-[#022561]'>
        <div className='p-5'>

          <h1 className='text-5xl text-white font-bold' >Welcome.</h1>
          <p className='text-2xl text-white font-bold'>Hundreds of movies and Tv shows to discover. Explore now.</p>
          <form onSubmit={formik.handleSubmit}>
            <div class="flex mt-10">
              <input type="text" className="w-[100%] py-2 px-3 border border-gray-300 rounded-l-3xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search for movie or tv show..." />
              <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-r-3xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Search
              </button>
            </div>

          </form>

        </div>


        <form></form>
      </div>
      <MovieShow data={data} isLoading={isLoading} isError={isError} error={error} />
    </>

  )
}
export default HomePage
