import React from 'react'
import { useNavigate, useParams } from 'react-router';
import { useTvShowByPageQuery } from '../features/movieApi';
import ScrollToTop from '../components/ScrollToTop';

const PageTvShow = () => {
  const { page, category } = useParams();
  const { data, isLoading, isError, error } = useTvShowByPageQuery({
    page,
    category
  })
  const nav = useNavigate();
  let displayCategory = `Page ${page}`;




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
        <ScrollToTop />
        <h1 className='text-2xl font-bold p-5'>{displayCategory}</h1>

        <div className='grid grid-cols-5 gap-5 sm:grid-cols-1 md:grid-cols-2 p-5'>
          {data?.results?.map((movie) => {
            return <div key={movie.id} className='w-[200px] cursor-pointer hover:scale-105 transition-all delay-75 shadow-lg rounded-md' onClick={() => nav(`/tv/detail/${movie.id}`)}>
              {
                movie.poster_path !== null ?

                  <img className='h-[300px] w-[200px] rounded-md' src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt="" /> : <img className='h-[300px] w-[200px] rounded-md' src="/assets/images/noimg.jpg" alt="" />

              }
              <div className='p-3 space-y-2'>
                <h1 className='text-xl font-bold'>{movie.name}</h1>
                {movie.first_air_date ?
                  <h1>{showReleaseDate(movie?.first_air_date)}</h1> :
                  <h1>No release date</h1>
                }
              </div>
            </div>
          })}
        </div>
      </div >

      <div className='flex justify-center'>
        <div className='flex space-x-5 mt-10 shadow-2xl'>
          <button onClick={() => nav(`/pagetvshow/${category}/${data?.page === 1 ? data.page : data.page - 1}`)}>PREV</button>
          <h1>{data?.page}</h1>
          {category === 'airing_today' && data.page + 1 < data.total_pages && < button onClick={() => nav(`/pagetvshow/${category}/${data?.page + 1}`)}>Next</button>}
          {category === 'on_the_air' && data.page + 1 < data.total_pages && < button onClick={() => nav(`/pagetvshow/${category}/${data?.page + 1}`)}>Next</button>}
          {data.page + 1 < 500 && < button onClick={() => nav(`/pagetvshow/${category}/${data?.page + 1}`)}>Next</button>}


        </div>

      </div >


    </>

  )
}

export default PageTvShow
