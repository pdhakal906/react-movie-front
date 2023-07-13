import React from 'react'
import { useMovieCastQuery, useMovieDetailsQuery, useMovieRecommendationQuery, useMovieReviewQuery, useMovieVideoQuery } from '../features/movieApi';
import { useNavigate, useParams } from 'react-router';
import ScrollToTop from '../components/ScrollToTop';


const MovieDetails = () => {

  const { id } = useParams();

  const { data, isLoading, isError, error } = useMovieVideoQuery(id);
  const { data: dat, isLoading: load, isError: isE, error: err } = useMovieDetailsQuery(id);
  const { data: castDat, isLoading: castIsLoading, isError: castIsError, error: castError } = useMovieCastQuery(id);
  const { data: reviewDat, isLoading: reviewIsLoading, isError: reviewIsError, error: reviewError } = useMovieReviewQuery(id);
  const { data: recommendationDat, isLoading: recommendationIsLoading, isError: recommendationIsError, error: recommendationError } = useMovieRecommendationQuery(id);

  const nav = useNavigate();



  if (isLoading || load || castIsLoading || reviewIsLoading || recommendationIsLoading) {
    return <div className='h-[200px] w-[200px] mx-auto mt-24'>
      <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_b88nh30c.json" background="transparent" speed="1" loop autoplay></lottie-player>
    </div>
  }

  const filteredCrew = castDat?.crew?.filter(crewMember => crewMember.known_for_department === "Directing" || crewMember.known_for_department === "Writing" && crewMember.job == "Director" || crewMember.job == "Screenplay")


  return (
    <div>
      <ScrollToTop />
      <div className='flex relative top-20 z-10'>
        <div className='sm:hidden md:hidden absolute left-[350px] text-white'>
          <div className='flex gap-3'>
            <h1 className='text-4xl font-bold'>{dat?.title}</h1>
            {dat.release_date !== "" ?
              < h1 className='text-4xl text-[#D1CDCD]'> ({dat.release_date?.split('-')[0]})</h1> : ""
            }
          </div>
          <div className='italic'>

            {dat.genres?.map((genre) => {
              return genre.name
            }).join(', ')}
          </div>

          <div className='mt-8 flex gap-10 items-center'>


            <div className='flex gap-1 items-center'>
              <div className='h-[70px] w-[70px] rounded-full bg-[#081C22] flex items-center justify-center'>
                <div className='h-[60px] w-[60px] rounded-full border-4 border-[#D2D531] flex items-center justify-center'>
                  <p className='text-white font-bold'>{Math.round(dat?.vote_average / 10 * 100)}%</p>

                </div>

              </div>
              <p className='font-bold'>User Ratings</p>
            </div>

            <div className='h-[50px] w-[50px] rounded-full bg-[#081C22] flex items-center justify-center'>
              <i class="fa-solid fa-list"></i>
            </div>
            <div className='h-[50px] w-[50px] rounded-full bg-[#081C22] flex items-center justify-center'>
              <i class="fa-solid fa-heart"></i>
            </div>
            <div className='h-[50px] w-[50px] rounded-full bg-[#081C22] flex items-center justify-center'>
              <i class="fa-solid fa-bookmark"></i>
            </div>
            <div className='h-[50px] w-[50px] rounded-full bg-[#081C22] flex items-center justify-center'>
              <i class="fa-solid fa-star"></i>
            </div>



          </div>

          <div className='mt-5'>
            <p className='text-3xl  font-bold'>Overview</p>
            {dat?.overview ?
              <p className='mt-3'>{dat?.overview}</p> : <p className='mt-3'>No overview available for this movie</p>
            }
          </div>

          <div className='flex mt-3 gap-2'>

            {filteredCrew?.length !== 0 ? filteredCrew.slice(0, 1).map((crew) => {
              return (
                <div className='flex flex-col'>
                  <p>{crew.name}</p>
                  <p className='italic'>{crew.job}</p>
                </div>

              )
            }) : <p>Creator not available for this show</p>
            }


          </div>





        </div>

      </div>
      {
        dat.backdrop_path &&
        <div className='w-full relative'>
          <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${dat?.backdrop_path}`} alt="" className='w-full h-[550px] sm:w-[100%] md:w-[100%] object-cover brightness-[0.3]' />
          <div className='absolute top-5 left-5 sm:top-10 sm:left-12 md:top-10 md:left-12'>
            <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${dat?.poster_path}`} className='w-[280px] h-[400px]  rounded-md' alt="" />
          </div>


        </div>


      }

      {
        !dat.backdrop_path &&

        <div className='relative bg-[#032541] w-full h-[550px]'>
          <div> {dat.poster_path !== null ?
            < img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${dat?.poster_path}`} className='absolute w-[280px] h-[400px] rounded-md sm:top-10 sm:left-12 md:top-10 md:left-12' alt="" /> : <img src="/assets/images/noimg.jpg" className='absolute w-[280px] h-[400px] sm:top-10 sm:left-12 md:top-10 md:left-12 rounded-md' alt="" />
          }

          </div>

        </div>

      }

      <div className='hidden sm:flex md:flex flex-col gap-5 p-5 bg-gray-300'>

        <div className='flex-none justify-center'>
          <p className='inline text-xl font-bold'>{dat?.title}</p>
          {dat.release_date !== "" ?
            < h1 className='inline text-2xl  text-gray-600 font-bold'> ({dat.release_date?.split('-')[0]})</h1> : ""
          }
          <div className='italic'>
            {dat.genres?.map((genre) => {
              return genre.name
            }).join(', ')}

          </div>
        </div>

        <div className='flex justify-center'>
          <div className='h-[60px] w-[60px] rounded-full bg-[#081C22] flex items-center justify-center'>
            <div className='h-[50px] w-[50px] rounded-full border-4 border-[#D2D531] flex items-center justify-center'>
              <p className='text-white text-sm font-bold'>{Math.round(dat?.vote_average / 10 * 100)}%</p>

            </div>

          </div>

        </div>

        <div>
          <div>
            <p className='text-xl font-bold'>Overview</p>
            <p className='mt-2'>{dat?.overview}</p>
          </div>
        </div>

        <div className='flex gap-2'>

          {filteredCrew?.length !== 0 ? filteredCrew.slice(0, 1).map((crew) => {
            return (
              <div className='flex flex-col'>
                <p>{crew.name}</p>
                <p className='italic'>{crew.job}</p>
              </div>

            )
          }) : <p>Creator not available for this show</p>
          }


        </div>



      </div>

      <div className='sm:hidden md:hidden px-5 mt-5'>
        <p className='text-xl font-bold my-5'>Cast</p>
        <div className='flex gap-10 items-center'>
          {castDat?.cast?.length !== 0 ? castDat?.cast.slice(0, 5).map((data) => {
            return (
              <div onClick={() => nav(`/person/detail/${data.id}`)} className='w-48 shadow-md rounded-md'>
                {
                  data?.profile_path &&

                  <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data?.profile_path}`} alt="" className='rounded-t-md' />
                }
                {
                  data?.profile_path === null && <img src='/assets/images/noimg.jpg' className='rounded-t-m h-[225px]' alt=''></img>
                }
                <div className='p-3'>
                  <p className='text-[16px] font-bold'>{data?.name}</p>
                  <p className='text-[13px]'>{data?.character}</p>

                </div>
              </div>

            )
          }) : <p>No cast available for this movie</p>}
          {castDat?.cast?.length > 5 ?
            <p className='font-bold'>View More <i class="fa-solid fa-arrow-right"></i></p> : ""
          }
        </div>
      </div>


      <div className='hidden sm:block md:block px-5 mt-5'>
        <p className='text-2xl font-bold'>Cast</p>
        <div className='flex gap-5 mt-5 overflow-x-auto'>
          {castDat?.cast?.length !== 0 ? castDat?.cast.slice(0, 5).map((data) => {
            return (
              <div onClick={() => nav(`/person/detail/${data.id}`)} className='flex-none w-48 shadow-md rounded-md '>
                {
                  data?.profile_path &&

                  <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data?.profile_path}`} alt="" className='rounded-t-md' />
                }
                {
                  data?.profile_path === null && <img src='/assets/images/noimg.jpg' className='rounded-t-m h-[225px]' alt=''></img>
                }
                <div className='p-3'>
                  <p className='text-[16px] font-bold'>{data?.name}</p>
                  <p className='text-[13px]'>{data?.character}</p>

                </div>
              </div>

            )
          }) : <p>No cast available for this movie</p>}
          {castDat?.cast?.length > 5 ?
            <p className='font-bold'>View More <i class="fa-solid fa-arrow-right"></i></p> : ""
          }
        </div>

      </div>

      <div className='px-5 mt-5'>
        <hr className="border-1 border-gray-400" />
      </div>



      <div>
        <div className='px-5 mt-5'>

          <p className='text-xl font-bold'>Reviews</p>
        </div>

        {reviewDat?.results?.length !== 0 &&
          <div className='p-5'>
            <div className='sm:hidden md:hidden border border-gray-400 rounded-md p-5 shadow-md'>
              <div className='flex gap-10'>
                <div className='flex items-center justify-center rounded-full bg-purple-600 h-[50px] w-[50px]'>
                  <p className='text-3xl text-white'>{reviewDat?.results[reviewDat.results.length - 1]?.author[0]?.toUpperCase()}
                  </p>
                </div>
                <div className='flex gap-5  items-center'>
                  <h1 className='text-lg font-bold'>A review by {reviewDat?.results[reviewDat.results.length - 1]?.author} </h1>
                  {reviewDat?.results[reviewDat.results.length - 1]?.author_details.rating !== null &&
                    <div className='flex'>
                      <div className='flex items-center justify-center rounded-md gap-1 h-[25px] w-[50px] bg-black text-yellow-500'>
                        <p><i class="fa-solid fa-star"></i></p>
                        <p className='text-[18px]'>{reviewDat?.results[reviewDat.results.length - 1].author_details.rating}</p>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className='mt-5 ml-20'>
                <p>{reviewDat?.results[reviewDat.results.length - 1]?.content?.substring(0, 500)}... <span className='underline'>read the rest.</span></p>
              </div>
            </div>

            {/* For mobile screen */}

            <div className='hidden sm:block md:block'>
              <div className='border border-gray-400 rounded-md p-3 shadow-md'>
                <div className='flex gap-3 items-center'>
                  <div className='flex items-center justify-center rounded-full bg-purple-600 h-[50px] w-[50px]'>
                    <p className='text-3xl text-white'>{reviewDat?.results[reviewDat.results.length - 1]?.author[0]?.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <h1 className='text-lg font-bold'>A review by {reviewDat?.results[reviewDat.results.length - 1]?.author} </h1>
                  </div>
                </div>

                {reviewDat?.results[reviewDat.results.length - 1]?.author_details.rating !== null &&
                  <div className='flex justify-center gap-1'>
                    <p>Rating: </p>
                    <div className='flex items-center justify-center rounded-md gap-1 h-[25px] w-[50px] bg-black text-yellow-500'>
                      <p><i class="fa-solid fa-star"></i></p>
                      <p className='text-[18px]'>{reviewDat?.results[reviewDat.results.length - 1].author_details.rating}</p>
                    </div>
                  </div>
                }


                <div className='mt-5'>
                  <p>{reviewDat?.results[reviewDat.results.length - 1]?.content?.substring(0, 500)}... <span className='underline'>read the rest.</span></p>
                </div>
              </div>
            </div>


            <p className='text-[16px] font-bold mt-5'>Read All Reviews</p>
          </div>


        }


        {reviewDat?.results?.length === 0 && <p className='p-5'>No reviews yet for this movie.</p>}

      </div>

      <div className='px-5 mt-5'>
        <hr className="border-1 border-gray-400" />
      </div>

      <div className='px-5 mt-5'>
        <p className='text-2xl font-bold'>Media</p>
        {
          data?.results?.length === 0 && <p className='my-5'>No video found for this movie</p>
        }
        {data?.results?.length !== 0 &&
          <div className='border mt-5 border-gray-400 rounded-md shadow-md'>

            <iframe className='mx-auto my-11 w-[800px] h-[600px] sm:w-[340px] sm:h-[300px] md:w-[340px] md:h-[300px]' src={`https://www.youtube.com/embed/${data.results[0]?.key}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>

        }


      </div>

      <div className='px-5 mt-5'>
        <hr className="border-1 border-gray-400" />
      </div>

      <div className='px-5 mt-5'>
        <p className='text-2xl font-bold'>Recommendations</p>
        <div className='flex gap-5 mt-5 overflow-x-auto'>
          {recommendationDat?.results?.length !== 0 ? recommendationDat?.results?.map((data) => {
            return (

              <div onClick={() => nav(`/movie/detail/${data.id}`)} className='flex-none w-48 shadow-md rounded-md ' key={data.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data?.poster_path}`}
                  alt={data.title}
                  className='w-48 h-auto rounded-md'
                />


                <div className='flex justify-between mt-1'>
                  <p>{data.title}</p>
                  <p >{Math.round(data?.vote_average / 10 * 100)}%</p>
                </div>

              </div>
            );
          }) : <p>No recommendations available for this movie</p>}
        </div>
      </div>


    </div >

  )
}

export default MovieDetails
