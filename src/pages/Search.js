import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useSearchAllQuery } from '../features/movieApi';



const Search = () => {
  const { search } = useParams();



  const { data, isLoading, isError, error } = useSearchAllQuery(search);

  const nav = useNavigate();



  if (isLoading) {
    return <div className='h-[400px] w-[400px] mx-auto mt-7'>
      <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_lit5uqwc.json" background="transparent" speed="1" loop autoplay></lottie-player>
    </div>
  }

  if (data?.results?.length < 1) {
    return <h1 className='text-red-600 text-2xl w-[50%] mx-auto mt-11'>Not found try searching again using another query</h1>
  }




  return (

    <div>
      <h1 className='text-2xl font-bold p-5'>Search Results:</h1>
      <div className='grid grid-cols-5 gap-5 sm:grid-cols-1 md:grid-cols-2 p-5'>
        {data.results.map((movie) => {
          if (movie.media_type === 'movie' || movie.media_type === 'tv') {
            return (
              <div onClick={() => nav(`/${movie.media_type}` + `/detail` + `/${movie.id}`)} key={movie.id} className='w-[200px] cursor-pointer hover:scale-105 transition-all delay-75 shadow-lg rounded-md'>
                {
                  movie.poster_path !== null ?
                    <img className='h-[300px] w-[200px] rounded-md' src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt="" /> : <img src="/assets/images/noimg.jpg" className='h-[300px] w-[200px] rounded-md' alt="" />
                }
                <div className='p-3 space-y-2'>
                  {movie.title ?
                    <h1 className='text-xl font-bold'>{movie.title}</h1> : <h1 className='text-xl font-bold'>{movie.name}</h1>
                  }
                  {
                    movie.overview !== "" ? <p>{movie.overview.substring(0, 150) + '...'}</p> : <p>No overview available</p>}
                </div>
              </div>
            )
          } else {
            return (
              <div onClick={() => nav(`/${movie.media_type}` + `/detail` + `/${movie.id}`)} key={movie.id} className='w-[200px] cursor-pointer hover:scale-105 transition-all delay-75 shadow-lg rounded-md'>{
                movie.profile_path !== null ?
                  <img className='h-[300px] w-[200px] rounded-md' src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.profile_path}`} alt="" /> : <img src="/assets/images/noimg.jpg" alt="" className='h-[300px] w-[200px] rounded-md' />
              }
                <div className='p-3 space-y-2'>
                  <h1 className='text-xl font-bold'>{movie.name}</h1>
                  <h1 className='font-bold'>Known For:</h1>
                  {movie.known_for.slice(0, 3).map((movie) => {
                    return (
                      <h1>{movie.title ? movie.title : movie.name}</h1>
                    )
                  }
                  )}
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Search