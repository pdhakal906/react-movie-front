import React from 'react'

import { useNavigate, useParams } from 'react-router';
import { useTvShowByCategoryQuery } from '../features/movieApi';

const CategoryTvShows = () => {

  const { category } = useParams();
  const { data, isLoading, isError, error } = useTvShowByCategoryQuery(category);
  const nav = useNavigate();
  let displayCategory = "";


  switch (category) {
    case 'popular':
      displayCategory = "Popular";
      break;
    case 'top_rated':
      displayCategory = "Top Rated";
      break;
    case 'upcoming':
      displayCategory = "Upcomming";
      break;

    case 'airing_today':
      displayCategory = "Airing Today"
      break

    case 'on_the_air':
      displayCategory = 'On'
      break
    case 'on_tv':
      displayCategory = 'On'
      break

    default:
      displayCategory = 'Undefined Category'



  }


  if (isLoading) {
    return <div className='h-[200px] w-[200px] mx-auto mt-24'>
      <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_b88nh30c.json" background="transparent" speed="1" loop autoplay></lottie-player>
    </div>
  }

  function showReleaseDate(date) {
    const formatted_date = new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return formatted_date
  }


  return (
    <>

      < div >
        <h1 className='text-2xl font-bold p-5'>{displayCategory} Tv Shows</h1>

        <div className='grid grid-cols-5 gap-5 sm:grid-cols-1 md:grid-cols-1 p-5'>
          {data?.results?.map((movie) => {
            return <div key={movie.id} className='w-[200px] sm:w-[100%] md:w-[100%] cursor-pointer hover:scale-105 transition-all delay-75 shadow-lg rounded-md' onClick={() => nav(`/tv/detail/${movie.id}`)}>

              {movie.poster_path != null ?

                < img className='h-[300px] w-[200px] sm:h-[150px] sm:w-[100px] md:h-[150px] md:w-[100px] rounded-md' src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt="" /> : <img className='h-[300px] w-[200px] sm:h-[150px] sm:w-[100px] md:h-[150px] md:w-[100px] rounded-md' src="/assets/images/noimg.jpg" alt="" />
              }


              <div className='p-3 space-y-2'>
                <h1 className='text-xl font-bold'>{movie.name}</h1>
                {movie.first_air_date ?
                  <h1>{showReleaseDate(movie?.first_air_date)}</h1> : <h1>No release date</h1>}
              </div>
            </div>
          })}
        </div>
      </div >

      <div className='flex justify-center'>
        <div className='flex space-x-5 mt-10 shadow-2xl'>
          {/* only show next button if there are more than 1 page */}
          {data?.page > 1 && <button>Prev</button>}
          <h1>1</h1>
          <button onClick={() => nav(`/pagetvshow/${category}/${data?.page + 1}`)}>Next</button>
        </div>

      </div>


    </>

  )
}

export default CategoryTvShows
