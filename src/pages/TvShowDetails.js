import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { useTvShowCastQuery, useTvShowDetailsQuery, useTvShowRecommendationQuery, useTvShowReviewQuery, useTvShowVideoQuery } from '../features/movieApi';
import ScrollToTop from '../components/ScrollToTop';

const TvShowDetails = () => {

  const { id } = useParams();
  const { data, isLoading, isError, Error } = useTvShowDetailsQuery(id);
  const { data: castData, isLoading: castIsLoading, isError: castIsError, error: castError } = useTvShowCastQuery(id);
  const { data: reviewData, isLoading: reviewIsLoading, isError: reviewIsError, error: reviewError } = useTvShowReviewQuery(id);
  const { data: videoData, isLoading: videoIsLoading, isError: videoIsError, error: videoError } = useTvShowVideoQuery(id);
  const { data: recommendationData, isLoading: recommendationIsLoading, isError: recommendationIsError, error: recommendationError } = useTvShowRecommendationQuery(id);

  const nav = useNavigate();



  if (isLoading || castIsLoading || reviewIsLoading || videoIsLoading || recommendationIsLoading) {
    return <div className='h-[200px] w-[200px] mx-auto mt-24'>
      <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_b88nh30c.json" background="transparent" speed="1" loop autoplay></lottie-player>
    </div>
  }


  return (
    <div>
      <ScrollToTop />
      <div className='flex relative top-20 z-10'>
        <div className='sm:hidden md:hidden absolute left-[350px] text-white'>
          <div className='flex gap-3'>
            <h1 className='text-4xl font-bold'>{data?.name}</h1>
            <h1 className='text-4xl text-[#D1CDCD]'> ({data.first_air_date?.split('-')[0]})</h1>
          </div>
          {data.genres?.map((genre) => {
            return genre.name
          }).join(', ')}

          <div className='mt-8 flex gap-10 items-center'>
            <div className='flex gap-1 items-center'>
              <div className='h-[70px] w-[70px] rounded-full bg-[#081C22] flex items-center justify-center'>
                <div className='h-[50px] w-[50px] rounded-full border-4 border-[#D2D531] flex items-center justify-center'>
                  <p className='text-white font-bold'>{Math.round(data?.vote_average / 10 * 100)}%</p>

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

          <div className='mt-10'>
            <p className='text-3xl font-bold'>Overview</p>
            {data?.overview ?
              <p className='mt-3'>{data?.overview}</p> : <p className='mt-3'>No overview available for this show</p>
            }
          </div>
          <p className='mt-10'>Created By:</p>
          <div className='flex gap-2'>

            {data?.created_by.length !== 0 ? data.created_by.map((creator) => {
              return (
                <p>{creator.name}</p>
              )
            }) : <p>Creator not available for this show</p>
            }


          </div>

        </div>

      </div>
      {data.backdrop_path &&
        <div className='w-full relative'>
          <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data?.backdrop_path}`} alt="" className='w-full h-[550px] sm:w-[100%] md:w-[100%] object-cover brightness-[0.3]' />
          <div className='absolute top-5 left-5 sm:top-10 sm:left-12 md:top-10 md:left-12'>
            <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data?.poster_path}`} className='w-[280px] h-[400px]  rounded-md' alt="" />
          </div>


        </div>


      }

      {!data.backdrop_path &&

        <div className='relative bg-[#032541] w-full h-[550px]'>
          <div> {data.poster_path !== null ?

            <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data?.poster_path}`} className='w-[280px] h-[400px]  sm:top-10 sm:left-12 md:top-10 md:left-12 rounded-md' alt="" /> : <img src="/assets/images/noimg.jpg" className='w-[280px] h-[400px] sm:top-10 sm:left-12 md:top-10 md:left-12  rounded-md' alt="" />
          }
          </div>

        </div>

      }


      {/* mobile view */}
      <div className='hidden sm:flex md:flex flex-col gap-5 p-5 bg-gray-300'>

        <div className='flex-none justify-center'>
          <p className='inline text-xl font-bold'>{data?.name}</p>
          {data.first_air_date !== "" ?
            < h1 className='inline text-2xl  text-gray-600 font-bold'> ({data.first_air_date?.split('-')[0]})</h1> : ""
          }
          <div className='italic'>
            {data.genres?.map((genre) => {
              return genre.name
            }).join(', ')}

          </div>
        </div>

        <div className='flex justify-center'>
          <div className='h-[60px] w-[60px] rounded-full bg-[#081C22] flex items-center justify-center'>
            <div className='h-[50px] w-[50px] rounded-full border-4 border-[#D2D531] flex items-center justify-center'>
              <p className='text-white text-sm font-bold'>{Math.round(data?.vote_average / 10 * 100)}%</p>

            </div>

          </div>

        </div>

        <div>
          <div>
            <p className='text-xl font-bold'>Overview</p>
            <p className='mt-2'>{data?.overview}</p>
          </div>
        </div>

        <div>

          <p className='mt-10'>Created By:</p>
          <div className='flex-none flex gap-2'>

            {data?.created_by.length !== 0 ? data.created_by.map((creator) => {
              return (
                <p className='italic'>{creator.name}</p>
              )
            }) : <p>Creator not available for this show</p>
            }


          </div>
        </div>

      </div>


      <div className='sm:hidden md:hidden px-5 mt-5'>
        <p className='text-2xl font-bold my-5'>Cast</p>
        <div className='flex gap-10 items-center'>
          {castData?.cast?.length !== 0 ? castData?.cast.slice(0, 5).map((data) => {
            return (
              <div onClick={() => nav(`/person/detail/${data.id}`)} className='rounded-md shadow-md shadow-gray-500 h-[350px] w-[150px]'>
                {
                  data?.profile_path &&

                  <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data?.profile_path}`} alt="" className='rounded-t-md' />
                }
                {
                  data?.profile_path === null && <img src='/assets/images/noimg.jpg' className='rounded-t-m h-[225px]' alt=''></img>
                }
                <div className='p-3'>
                  <p className='text-[16px] font-bold'>{data?.name}</p>
                  <p className='text-[13px]'>{data.roles[0]?.character}</p>
                  <p className='text-[12px] text-gray-600'>{data.roles[0]?.episode_count} Episodes</p>
                </div>
              </div>

            )
          }) : <p>No cast available for this show</p>}
          {castData?.cast?.length > 5 ?
            <p className='font-bold'>View More <i class="fa-solid fa-arrow-right"></i></p> : ""
          }
        </div>
      </div>


      {/* mobile view */}
      <div className='hidden sm:block md:block px-5 mt-5'>
        <p className='text-2xl font-bold'>Cast</p>
        <div className='flex gap-5 mt-5 overflow-x-auto'>
          {castData?.cast?.length !== 0 ? castData?.cast.slice(0, 5).map((data) => {
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
                  <p className='text-[13px]'>{data.roles[0]?.character}</p>
                  <p className='text-[12px] text-gray-600'>{data.roles[0]?.episode_count} Episodes</p>

                </div>
              </div>

            )
          }) : <p>No cast available for this movie</p>}
          {castData?.cast?.length > 5 ?
            <p className='font-bold'>View More <i class="fa-solid fa-arrow-right"></i></p> : ""
          }
        </div>

      </div>



      <div className='px-5 mt-5'>
        <hr className="border-1 border-gray-400" />
      </div>


      <div className='px-5 mt-5'>
        <p className='text-2xl font-bold'>Latest Season</p>
        <div className='mt-5 border border-gray-400 rounded-md flex gap-10 shadow-md'>{
          data?.last_episode_to_air?.still_path &&

          <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data?.last_episode_to_air?.still_path}`} className='sm:hidden md:hidden h-[250px] w-[150px] rounded-t-md' alt="" />
        }

          {data?.last_episode_to_air?.still_path === null && <img src='/assets/images/noimg.jpg' alt="" className='sm:hidden md:hidden h-[250px] w-[150px]' />}

          <div className='mt-5 sm:p-5 md:p-5'>
            <p className='text-2xl font-bold'>Season {data?.last_episode_to_air?.season_number}</p>

            <div className='flex gap-1 items-center'>
              <p className='font-bold text-[14px]'>{data?.last_episode_to_air?.air_date.split('-')[0]}</p>
              <i className="fa-solid fa-lg fa-grip-lines-vertical"></i>
              <p className='font-bold text-[14px]'>{data?.last_episode_to_air?.episode_number} Episode(s)</p>
            </div>
            <p className='mt-5'>{data?.seasons[data.seasons.length - 1]?.overview}</p>

            {data?.seasons[data.seasons.length - 1]?.overview === "" && <p className='mt-5'>No overview available</p>}
          </div>
        </div>
        <p className='text-[16px] font-bold mt-5'>View all seasons</p>
      </div>
      <div className='px-5 mt-5'>
        <hr className="border-1 border-gray-400" />
      </div>
      <div className=''>
        <div className='px-5 mt-5'>

          <p className='text-2xl font-bold'>Reviews</p>
        </div>

        {reviewData?.results?.length !== 0 &&
          <div className='p-5'>
            <div className='sm:hidden md:hidden border border-gray-400 rounded-md p-5 shadow-md'>
              <div className='flex gap-10'>
                <div className='flex items-center justify-center rounded-full bg-purple-600 h-[50px] w-[50px]'>
                  <p className='text-3xl text-white'>{reviewData?.results[reviewData.results.length - 1]?.author[0]?.toUpperCase()}
                  </p>
                </div>
                <div className='flex gap-5 items-center'>
                  <h1 className='text-[20px] font-bold'>A review by {reviewData?.results[reviewData.results.length - 1]?.author} </h1>
                  {reviewData?.results[reviewData.results.length - 1]?.author_details.rating !== null &&
                    <div className='flex flex-col'>
                      <div className='flex items-center justify-center rounded-md gap-1 h-[25px] w-[50px] bg-black text-yellow-500'>
                        <p><i class="fa-solid fa-star"></i></p>
                        <p className='text-[18px]'>{reviewData?.results[reviewData.results.length - 1].author_details.rating}</p>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className='mt-5 ml-20'>
                <p>{reviewData?.results[reviewData.results.length - 1]?.content?.substring(0, 500)}... <span className='underline'>read the rest.</span></p>
              </div>
            </div>



            {/* For mobile screen */}

            <div className='hidden sm:block md:block'>
              <div className='border border-gray-400 rounded-md p-3 shadow-md'>
                <div className='flex gap-3 items-center'>
                  <div className='flex items-center justify-center rounded-full bg-purple-600 h-[50px] w-[50px]'>
                    <p className='text-3xl text-white'>{reviewData?.results[reviewData.results.length - 1]?.author[0]?.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <h1 className='text-lg font-bold'>A review by {reviewData?.results[reviewData.results.length - 1]?.author} </h1>
                  </div>
                </div>

                {reviewData?.results[reviewData.results.length - 1]?.author_details.rating !== null &&
                  <div className='flex justify-center gap-1'>
                    <p>Rating: </p>
                    <div className='flex items-center justify-center rounded-md gap-1 h-[25px] w-[50px] bg-black text-yellow-500'>
                      <p><i class="fa-solid fa-star"></i></p>
                      <p className='text-[18px]'>{reviewData?.results[reviewData.results.length - 1].author_details.rating}</p>
                    </div>
                  </div>
                }


                <div className='mt-5'>
                  <p>{reviewData?.results[reviewData.results.length - 1]?.content?.substring(0, 500)}... <span className='underline'>read the rest.</span></p>
                </div>
              </div>
            </div>



            <p className='text-[16px] font-bold mt-5'>Read All Reviews</p>
          </div>


        }


        {reviewData?.results?.length === 0 && <p className='p-5'>No reviews yet for this show.</p>}

      </div>

      <div className='px-5 mt-5'>
        <hr className="border-1 border-gray-400" />
      </div>

      <div className='px-5 mt-5'>
        <p className='text-2xl font-bold'>Media</p>
        {
          videoData?.results?.length === 0 && <p className='my-5'>No video found for this show</p>
        }
        {videoData?.results?.length !== 0 &&
          <div className='border mt-5 border-gray-400 rounded-md shadow-md'>

            <iframe className='mx-auto my-11  w-[800px] h-[600px] sm:w-[340px] sm:h-[300px] md:w-[340px] md:h-[300px]' src={`https://www.youtube.com/embed/${videoData.results[0]?.key}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>

        }


      </div>

      <div className='px-5 mt-5'>
        <hr className="border-1 border-gray-400" />
      </div>

      <div className='px-5 mt-5'>
        <p className='text-2xl font-bold'>Recommendations</p>
        <div className='flex gap-5 mt-5 overflow-x-auto'>
          {recommendationData?.results?.length !== 0 ? recommendationData?.results?.map((data) => {
            return (
              <div onClick={() => nav(`/tv/detail/${data.id}`)} className='flex-none w-48 shadow-md rounded-md ' key={data.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data?.poster_path}`}
                  alt={data.title}
                  className='w-48 h-auto rounded-md'
                />


                <div className='flex justify-between mt-1'>
                  <p>{data.name}</p>
                  <p >{Math.round(data?.vote_average / 10 * 100)}%</p>
                </div>

              </div>
            );
          }) : <p>No recommendations available for this show</p>}
        </div>
      </div>


    </div >

  )


}

export default TvShowDetails
