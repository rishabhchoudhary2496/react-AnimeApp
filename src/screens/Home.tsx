import { useState, useEffect, ReactElement, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Home.module.css'
import {
  getTopAiringAnime,
  getTopAnimeMovies,
  getTopSpecials,
  getTopTv,
  getTopUpcomingAnime,
  getTopOva,
} from '../service/animeService'
import Card from '../components/Card'
import { Swiper, SwiperSlide } from 'swiper/react'
import breakpoints from '../utils/breakpoints'
import Skeleton from '../components/Skeleton'
import Search from '../components/Search'
import LoadingAnime from './LoadingAnime'

// Import Swiper styles

interface AnimeData {}

interface Anime {
  end_date: Date | null
  episodes: Number | null
  images: {
    jpg?: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
    webp?: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
  }
  mal_id: number
  rank: number
  score: number
  start_date: Date
  title: string
  title_english?: string
  type: string
  url: string
  members: number
  status: string | null
}

interface IPagination {
  current_page: number
  has_next_page: boolean
  items: {
    count: number
    total: number
    per_page: number
  }
  last_visible_page: number
}

interface IAnimeData {
  pagination: IPagination
  data: Anime[]
}
const animeState = {
  pagination: {
    current_page: 0,
    has_next_page: false,
    items: {
      count: 0,
      total: 0,
      per_page: 0,
    },
    last_visible_page: 0,
  },
  data: [],
}

const Home = (): ReactElement => {
  const [upcomingAnime, setUpcomingAnime] = useState<IAnimeData>(animeState)
  const [loadingUpcomingAnime, setLoadingUpcomingAnime] = useState(true)

  const [airingAnime, setAiringAnime] = useState<IAnimeData>(animeState)
  const [loadingAiringAnime, setLoadingAiringAnime] = useState(true)

  const [animeMovie, setAnimeMovies] = useState<IAnimeData>(animeState)
  const [loadingAnimeMovie, setLoadingAnimeMovie] = useState(true)

  const [topSpecials, setTopSpecials] = useState<IAnimeData>(animeState)
  const [loadingSpecials, setLoadingSpecials] = useState(true)

  const [topTv, setTopTv] = useState<IAnimeData>(animeState)
  const [loadingTv, setLoadingTv] = useState(true)

  const getUpcomingAnime = useCallback(async (page = 1) => {
    setLoadingUpcomingAnime(true)
    const result = await getTopUpcomingAnime(page)
    if (result) {
      setUpcomingAnime({
        pagination: result?.pagination,
        data: upcomingAnime.data.concat(result?.data),
      })
    }
    setLoadingUpcomingAnime(false)
  }, [])

  const getAiringAnime = useCallback(async (page = 1) => {
    setLoadingAiringAnime(true)
    const result = await getTopAiringAnime(page)
    if (result) {
      setAiringAnime({
        pagination: result?.pagination,
        data: airingAnime.data.concat(result?.data),
      })
    }
    setLoadingAiringAnime(false)
  }, [])

  const getAnimeMovies = useCallback(async (page = 1) => {
    setLoadingAnimeMovie(true)
    const result = await getTopAnimeMovies(page)
    if (result) {
      setAnimeMovies({
        pagination: result?.pagination,
        data: animeMovie.data.concat(result?.data),
      })
    }
    setLoadingAnimeMovie(false)
  }, [])

  const getSpecials = useCallback(async (page = 1) => {
    setLoadingSpecials(true)
    const result = await getTopSpecials(page)
    if (result) {
      setTopSpecials({
        pagination: result?.pagination,
        data: topSpecials.data.concat(result?.data),
      })
    }
    setLoadingSpecials(false)
  }, [])

  const getTv = useCallback(async (page = 1) => {
    setLoadingTv(true)
    const result = await getTopTv(page)
    if (result) {
      setTopTv({
        pagination: result?.pagination,
        data: topTv.data.concat(result?.data),
      })
    }
    setLoadingTv(false)
  }, [])

  useEffect(() => {
    // console.log('re reneering get upcoming anime', upcomingAnimePage)
    getUpcomingAnime()
    getAiringAnime()
    getAnimeMovies()
    getSpecials()
    getTv()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    // slidesToScroll: 1,
  }

  return (
    <div className={styles.container}>
      <Search />

      <h1 className={styles.heading}>Top Upcoming Anime</h1>
      <Swiper
        spaceBetween={4}
        slidesPerView={4.7}
        breakpoints={breakpoints}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        onReachEnd={() =>
          upcomingAnime?.pagination.has_next_page
            ? getUpcomingAnime(upcomingAnime?.pagination?.current_page + 1)
            : null
        }
      >
        {loadingUpcomingAnime && <LoadingAnime />}
        {upcomingAnime?.data?.map((anime) => (
          <SwiperSlide>
            <Card
              end_date={anime?.end_date}
              episodes={anime.episodes}
              image_url={anime.images?.jpg?.large_image_url}
              mal_id={anime.mal_id}
              members={anime.members}
              rank={anime.rank}
              score={anime.score}
              start_date={anime?.start_date}
              title={anime.title_english ? anime.title_english : anime.title}
              type={anime.type}
              url={anime.url}
              status={anime?.status}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <h1 className={styles.heading}>Top Airing Anime</h1>
      <Swiper
        spaceBetween={4}
        slidesPerView={4.7}
        breakpoints={breakpoints}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        onReachEnd={() =>
          airingAnime?.pagination.has_next_page
            ? getAiringAnime(airingAnime?.pagination?.current_page + 1)
            : null
        }
      >
        {loadingAiringAnime && <LoadingAnime />}
        {airingAnime?.data.map((anime) => (
          <SwiperSlide>
            <Card
              end_date={anime?.end_date}
              episodes={anime.episodes}
              image_url={anime.images?.jpg?.large_image_url}
              mal_id={anime.mal_id}
              members={anime.members}
              rank={anime.rank}
              score={anime.score}
              start_date={anime?.start_date}
              title={anime.title_english ? anime.title_english : anime.title}
              type={anime.type}
              url={anime.url}
              status={anime?.status}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <h1 className={styles.heading}>Top Anime Movies</h1>
      <Swiper
        spaceBetween={4}
        slidesPerView={4.7}
        breakpoints={breakpoints}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        onReachEnd={() =>
          animeMovie?.pagination.has_next_page
            ? getAnimeMovies(animeMovie?.pagination?.current_page + 1)
            : null
        }
      >
        {loadingAnimeMovie && <LoadingAnime />}
        {animeMovie?.data.map((anime) => (
          <SwiperSlide>
            <Card
              end_date={anime?.end_date}
              episodes={anime.episodes}
              image_url={anime.images?.jpg?.large_image_url}
              mal_id={anime.mal_id}
              members={anime.members}
              rank={anime.rank}
              score={anime.score}
              start_date={anime?.start_date}
              title={anime.title_english ? anime.title_english : anime.title}
              type={anime.type}
              url={anime.url}
              status={anime?.status}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {topSpecials?.data && <h1 className={styles.heading}>Top Specials</h1>}
      <Swiper
        spaceBetween={4}
        slidesPerView={4.7}
        breakpoints={breakpoints}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        onReachEnd={() =>
          topSpecials?.pagination.has_next_page
            ? getSpecials(topSpecials?.pagination?.current_page + 1)
            : null
        }
      >
        {loadingSpecials && <LoadingAnime />}
        {topSpecials?.data.map((anime) => (
          <SwiperSlide>
            <Card
              end_date={anime?.end_date}
              episodes={anime.episodes}
              image_url={anime.images?.jpg?.large_image_url}
              mal_id={anime.mal_id}
              members={anime.members}
              rank={anime.rank}
              score={anime.score}
              start_date={anime?.start_date}
              title={anime.title_english ? anime.title_english : anime.title}
              type={anime.type}
              url={anime.url}
              status={anime?.status}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {topTv?.data && <h1 className={styles.heading}>Top TV Shows</h1>}
      <Swiper
        spaceBetween={4}
        slidesPerView={4.7}
        breakpoints={breakpoints}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        onReachEnd={() =>
          topTv?.pagination.has_next_page
            ? getTv(topTv?.pagination?.current_page + 1)
            : null
        }
      >
        {loadingTv && <LoadingAnime />}
        {topTv?.data.map((anime) => (
          <SwiperSlide>
            <Card
              end_date={anime?.end_date}
              episodes={anime.episodes}
              image_url={anime.images?.jpg?.large_image_url}
              mal_id={anime.mal_id}
              members={anime.members}
              rank={anime.rank}
              score={anime.score}
              start_date={anime?.start_date}
              title={anime.title_english ? anime.title_english : anime.title}
              type={anime.type}
              url={anime.url}
              status={anime?.status}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.footer}>
        Made With <FontAwesomeIcon icon={faHeart} className={styles.heart} />
      </div>
    </div>
  )
}

export default Home
