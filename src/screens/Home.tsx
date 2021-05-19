import React, { useState, useEffect, ReactElement } from 'react'
import styles from '../styles/Home.module.css'
import {
  getTopAiringAnime,
  getTopAnimeMovies,
  getTopSpecials,
  getTopTv,
  getTopUpcomingAnime,
} from '../service/animeService'
import Card from '../components/Card'

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
  const [airingAnime, setAiringAnime] = useState<Anime[]>([])
  const [animeMovie, setAnimeMovies] = useState<Anime[]>([])
  const [topSpecials, setTopSpecials] = useState<Anime[]>([])
  const [topTv, setTopTv] = useState<Anime[]>([])

  useEffect(() => {
    ;(async function () {
      const data = await getTopUpcomingAnime()
      setUpcomingAnime(data)
      console.log(upcomingAnime)
    })()
  }, [upcomingAnime])

  useEffect(() => {
    ;(async function () {
      const data = await getTopAiringAnime()
      setAiringAnime(data)
      console.log(airingAnime)
    })()
  }, [airingAnime])

  useEffect(() => {
    ;(async function () {
      const data = await getTopAnimeMovies()
      setAnimeMovies(data)
      console.log(animeMovie)
    })()
  }, [animeMovie])

  useEffect(() => {
    ;(async function () {
      const data = await getTopSpecials()
      setTopSpecials(data)
      console.log(topSpecials)
    })()
  }, [topSpecials])

  useEffect(() => {
    ;(async function () {
      const data = await getTopTv()
      setTopTv(data)
      console.log(topTv)
    })()
  }, [topTv])

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Top Upcoming Anime</h1>
      <div className={styles.horizontalRow}>
        {upcomingAnime.map((anime) => (
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
        ))}
      </div>
      <h1 className={styles.heading}>Top Airing Anime</h1>
      <div className={styles.horizontalRow}>
        {airingAnime.map((anime) => (
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
        ))}
      </div>
      <h1 className={styles.heading}>Top Anime Movies</h1>
      <div className={styles.horizontalRow}>
        {animeMovie.map((anime) => (
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
        ))}
      </div>
      <h1 className={styles.heading}>Top Specials</h1>
      <div className={styles.horizontalRow}>
        {topSpecials.map((anime) => (
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
        ))}
      </div>
      <h1 className={styles.heading}>Top TV</h1>
      <div className={styles.horizontalRow}>
        {topTv.map((anime) => (
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
        ))}
      </div>
    </div>
  )
}

export default Home
