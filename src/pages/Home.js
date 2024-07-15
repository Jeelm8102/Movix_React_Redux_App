import React, { useEffect, useState } from 'react'
import BannerHome from '../components/BannerHome'
import Card from '../components/Card'
import { useSelector } from 'react-redux'
import axios from 'axios'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import useFetch from '../hooks/useFetch'

const Home = () => {

  const trendingData = useSelector(state => state.movieoData.bannerData)
  // const [nowPlayingData, setNowPlayingData] = useState([])
  const {data : nowPlayingData} = useFetch('/movie/now_playing')
  const {data : topRatedData} = useFetch('/movie/top_rated')
  const {data : popularTvShowData} = useFetch('/tv/popular')
  const {data : onTheAirTvShowData} = useFetch('/tv/on_the_air')
  const {data : upcomingMovieData} = useFetch('/movie/upcoming')

  // const fetchNowPlayingData = async () => {
  //   try {
  //     const response = await axios.get("/movie/now_playing")
  //     setNowPlayingData(response.data.results)
  //   } catch (error) {
  //     console.log("error", error)
  //   }
  // }

  // useEffect(() => {
  //   fetchNowPlayingData()
  // })

  return (
    <div>

      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading={"Trending Now"} trending={true} />
      <HorizontalScrollCard data={nowPlayingData} heading={"Continue Watching"} media_type={"movie"} />
      <HorizontalScrollCard data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"} />
      <HorizontalScrollCard data={popularTvShowData} heading={"Popular TV Show"} media_type={"tv"} /> 
      <HorizontalScrollCard data={onTheAirTvShowData} heading={"On The Air"} media_type={"tv"} /> 
      <HorizontalScrollCard data={upcomingMovieData} heading={"Upcoming Movies"} media_type={"movie"} /> 

    </div>
  )
}

export default Home