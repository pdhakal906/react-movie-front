import React from 'react'
import { usePersonDetailQuery } from '../features/movieApi'
import { useParams } from 'react-router'
import ScrollToTop from '../components/ScrollToTop'

const PeopleDetail = () => {
  const { id } = useParams()
  const { data, isLoading, isError, error } = usePersonDetailQuery(id)







  if (isLoading) {
    return <div className='h-[400px] w-[400px] mx-auto mt-7'>
      <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_lit5uqwc.json" background="transparent" speed="1" loop autoplay></lottie-player>
    </div>
  }


  return (
    <div>
      <ScrollToTop />
      <div className='p-5 flex gap-8 sm:flex-col sm:gap-2 md:flex-col md:gap-2'>
        {data.profile_path !== null ?
          <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.profile_path}`} alt="" className='h-[400px] w-auto sm:w-[500px] sm:h-[500px] md:w-[500px] md:h-[500px] rounded-md' /> : <img src='/assets/images/noimg.jpg' className='h-[400px] w-[300px] sm:w-[500px] sm:h-[500px] md:w-[500px] md:h-[500px] rounded-md' alt="" />
        }
        <div className='flex flex-col gap-5'>
          <h1 className='text-3xl font-bold'>{data.name}</h1>
          {data?.biography ?
            <div className='sm:p-1 md:p-1'>
              <h1 className='text-xl font-bold'>Bigoraphy</h1>
              {data.biography.split("\n\n").map((p, i) => {
                return <p className='mt-3' key={i}>{p}</p>
              })}
            </div> : <div><h1 className='text-xl font-bold'>Biography</h1> <h1>No biography avialable</h1></div>
          }
        </div>
      </div>
    </div>
  )
}

export default PeopleDetail
