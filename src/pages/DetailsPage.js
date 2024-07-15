import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import useFetchDetails from '../hooks/useFetchDetails'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Divider from '../components/Divider'
import HorizontalScrollCard from '../components/HorizontalScrollCard'

import { SiGoogledisplayandvideo360 } from "react-icons/si";
import VideoPlay from '../components/VideoPlay'

const DetailsPage = () => {

  const params = useParams()
  const imageURL = useSelector(state => state.movieoData.imageURL)
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`)
  const { data: recommendationData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`)
  const [playVideo, setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState("")

  // console.log("data", data)
  // console.log("starcast", castData)

  const handlePlayVideo = (data) => {
    setPlayVideoId(data)
    setPlayVideo(true)
  }

  const duration = (data?.runtime / 60)?.toFixed(1)?.split(".")

  return (
    <div>

      <div className='w-full h-[380px] relative hidden lg:block z-0'>
        <div className='w-full h-full'>
          <img
            src={imageURL + data?.backdrop_path}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/100 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>

        <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
          <img
            src={imageURL + data?.poster_path}
            className='h-80 w-60 object-cover rounded'
          />
          {/* <button onClick={() => handlePlayVideo(data)} className='text-black bg-white rounded p-2 justify-center items-center'>Play Now</button> */}
        </div>


        <div>

          <div className='relative justify-center ml-[7.5em] -mt-2 mb-2 lg:mt-0 lg:mb-0 lg:ml-0'>
            <button onClick={() => handlePlayVideo(data)} className='text-white flex font-bold bg-gray-600 px-4 py-2 mt-0 items-center justify-center rounded-xl lg:text-[28px] lg:pt-2 lg:mt-[-20px] relative hover:scale-110 transition-all'>{<SiGoogledisplayandvideo360 />}<span className='text-xl pl-2 pt-1'>Play Now</span>
            </button>
          </div>
          {/* <button className='text-white text-3xl'>{<SiGoogledisplayandvideo360 />}</button> */}
          <h2 className='text-2xl lg:text-4xl lg:pt-3 font-bold text-white'>{data?.title || data?.name}</h2>
          <p className='text-neutral-400'>{data?.tagline}</p>

          <Divider />

          <div className='flex items-center gap-3'>
            <p>Rating: {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View: {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>Duration: {duration[0]}h {duration[1]}m</p>
          </div>

          <Divider />

          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{data?.overview}</p>

            <Divider />
            <div className='flex items-center gap-3 my-3 text-center'>
              <p>
                Status: {data?.status}
              </p>
              <span>|</span>
              <p>
                Released Date: {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p>
                Revenue: {Number(data?.revenue)}
              </p>
            </div>
            <Divider />

          </div>

          <div>
            {castData?.crew && castData.crew.length > 0 && (
              <p><span className='text-white'>Director </span>: {castData.crew[0]?.name}</p>
            )}
            {/* <p><span className='text-white'>Director </span>: {castData?.crew[0]?.name}</p> */}
          </div>

          <Divider />

          <h2 className='font-bold text-lg'>Cast :</h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4'>
            {
              castData?.cast?.filter(el => el.profile_path).map((starCast, index) => {
                return (
                  <div>
                    <div>
                      <img
                        src={imageURL + starCast?.profile_path}
                        className='w-20 h-20 object-cover rounded-full'
                      />
                    </div>
                    <p className='font-bold text-center text-sm text-neutral-400'>{starCast?.name}</p>
                  </div>
                )
              })
            }
          </div>

        </div>

      </div>

      <div>
        <HorizontalScrollCard data={similarData} heading={"Similar " + params?.explore} media_type={params?.explore} />
        <HorizontalScrollCard data={recommendationData} heading={"Recommended " + params?.explore} media_type={params?.explore} />
      </div>

      {
        playVideo && (
          <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params?.explore} />
        )
      }
    </div>
  )
}

export default DetailsPage