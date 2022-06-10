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
} from '../service/animeService'
import Card from '../components/Card'
import { Swiper, SwiperSlide } from 'swiper/react'
import breakpoints from '../utils/breakpoints'
import Skeleton from '../components/Skeleton'
import Search from '../components/Search'

// Import Swiper styles

interface Anime {
  end_date: Date | null
  episodes: Number | null
  image_url: string
  mal_id: number
  rank: number
  score: number
  start_date: Date
  title: string
  type: string
  url: string
  members: number
}

const Home = (): ReactElement => {
  const [upcomingAnime, setUpcomingAnime] = useState<Anime[]>([])
  const [upcomingAnimePage, setUpcomingAnimePage] = useState(1)
  const [loadingUpcomingAnime, setLoadingUpcomingAnime] = useState(false)
  const [airingAnime, setAiringAnime] = useState<Anime[]>([])
  const [loadingAiringAnime, setLoadingAiringAnime] = useState(false)
  const [animeMovie, setAnimeMovies] = useState<Anime[]>([])
  const [loadingAnimeMovie, setLoadingAnimeMovie] = useState(false)
  const [topSpecials, setTopSpecials] = useState<Anime[]>([])
  const [loadingSpecials, setLoadingSpecials] = useState(false)
  const [topTv, setTopTv] = useState<Anime[]>([])
  const [loadingTv, setLoadingTv] = useState(false)

  const getUpcomingAnime = useCallback(async () => {
    setLoadingUpcomingAnime(true)
    const data = await getTopUpcomingAnime(upcomingAnimePage)
    if (data) {
      setUpcomingAnime([...upcomingAnime, ...data])
    }
    setLoadingUpcomingAnime(false)
  }, [upcomingAnime, upcomingAnimePage])

  const getAiringAnime = useCallback(async () => {
    setLoadingAiringAnime(true)
    const data = await getTopAiringAnime()
    setAiringAnime(data)
    setLoadingAiringAnime(false)
  }, [airingAnime])

  const getAnimeMovies = useCallback(async () => {
    setLoadingAnimeMovie(true)
    const data = await getTopAnimeMovies()
    setAnimeMovies(data)
    setLoadingAnimeMovie(false)
  }, [animeMovie])

  const getSpecials = useCallback(async () => {
    setLoadingSpecials(true)
    const data = await getTopSpecials()
    setTopSpecials(data)
    setLoadingSpecials(false)
  }, [topSpecials])

  const getTv = useCallback(async () => {
    setLoadingTv(true)
    const data = await getTopTv()
    setTopTv(data)
    setLoadingTv(false)
  }, [topTv])

  useEffect(() => {
    getUpcomingAnime()
    getAiringAnime()
    getAnimeMovies()
    getSpecials()
    getTv()
  }, [upcomingAnimePage])

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

      {loadingUpcomingAnime && upcomingAnimePage != 1 && (
        <div className={styles.horizontalRow}>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
        </div>
      )}

      <Swiper
        spaceBetween={4}
        slidesPerView={4.7}
        breakpoints={breakpoints}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        onReachEnd={() => setUpcomingAnimePage((PrevState) => PrevState + 1)}
      >
        {upcomingAnime.map((anime) => (
          <SwiperSlide>
            <Card
              end_date={anime.end_date}
              episodes={anime.episodes}
              image_url={anime.image_url}
              mal_id={anime.mal_id}
              members={anime.members}
              rank={anime.rank}
              score={anime.score}
              start_date={anime.start_date}
              title={anime.title}
              type={anime.type}
              url={anime.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <h1 className={styles.heading}>Top Airing Anime</h1>
      {loadingAiringAnime && (
        <div className={styles.horizontalRow}>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
        </div>
      )}

      <Swiper
        spaceBetween={4}
        slidesPerView={4.7}
        breakpoints={breakpoints}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {airingAnime.map((anime) => (
          <SwiperSlide>
            <Card
              end_date={anime.end_date}
              episodes={anime.episodes}
              image_url={anime.image_url}
              mal_id={anime.mal_id}
              members={anime.members}
              rank={anime.rank}
              score={anime.score}
              start_date={anime.start_date}
              title={anime.title}
              type={anime.type}
              url={anime.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <h1 className={styles.heading}>Top Anime Movies</h1>
      {loadingAnimeMovie && (
        <div className={styles.horizontalRow}>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
        </div>
      )}
      <Swiper
        spaceBetween={4}
        slidesPerView={4.7}
        breakpoints={breakpoints}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {animeMovie.map((anime) => (
          <SwiperSlide>
            <Card
              end_date={anime.end_date}
              episodes={anime.episodes}
              image_url={anime.image_url}
              mal_id={anime.mal_id}
              members={anime.members}
              rank={anime.rank}
              score={anime.score}
              start_date={anime.start_date}
              title={anime.title}
              type={anime.type}
              url={anime.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <h1 className={styles.heading}>Top Specials</h1>
      {loadingSpecials && (
        <div className={styles.horizontalRow}>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
        </div>
      )}
      <Swiper
        spaceBetween={4}
        slidesPerView={4.7}
        breakpoints={breakpoints}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {topSpecials.map((anime) => (
          <SwiperSlide>
            <Card
              end_date={anime.end_date}
              episodes={anime.episodes}
              image_url={anime.image_url}
              mal_id={anime.mal_id}
              members={anime.members}
              rank={anime.rank}
              score={anime.score}
              start_date={anime.start_date}
              title={anime.title}
              type={anime.type}
              url={anime.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <h1 className={styles.heading}>Top TV</h1>
      {loadingTv && (
        <div className={styles.horizontalRow}>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
        </div>
      )}

      <Swiper
        spaceBetween={4}
        slidesPerView={4.7}
        breakpoints={breakpoints}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {topTv.map((anime) => (
          <SwiperSlide>
            <Card
              end_date={anime.end_date}
              episodes={anime.episodes}
              image_url={anime.image_url}
              mal_id={anime.mal_id}
              members={anime.members}
              rank={anime.rank}
              score={anime.score}
              start_date={anime.start_date}
              title={anime.title}
              type={anime.type}
              url={anime.url}
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
