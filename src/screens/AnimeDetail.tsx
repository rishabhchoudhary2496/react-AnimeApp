import React, { useEffect, useState, useCallback, ReactElement } from 'react'
import { getAnimeData } from '../service/animeService'
import styles from '../styles/AnimeDetails.module.css'
import ReactPlayer from 'react-player'

interface Match {
  match: {
    params: {
      id: string
    }
  }
}

interface IDetails {
  aired: object
  airing: boolean
  broadcast: string
  duration: string
  episodes: number
  favorites: number
  genres: Array<object>
  image_url: string
  members: number
  popularity: number
  premiered: string
  rating: string
  source: string
  status: string
  synopsis: string
  title: string
  title_english: string
  trailer_url: string
  type: string
  url: string
  rank: number
  score: number
}

const AnimeDetail = ({ match }: Match): ReactElement => {
  const [details, setDetails] = useState<IDetails>()

  const api = useCallback(async () => {
    const data = await getAnimeData(match.params.id)
    console.log('data', data)
    setDetails(data)
  }, [match.params.id, details])

  useEffect(() => {
    api()
  }, [])

  return (
    <div className={styles.container}>
      <ReactPlayer
        url={details?.trailer_url}
        width='100%'
        height={300}
      ></ReactPlayer>
      <div className={styles.flex}>
        <img src={details?.image_url} alt='' />
        <div className={styles.textBox}>
          {details?.title_english && (
            <p>English Title: {details?.title_english}</p>
          )}
          <p>Title: {details?.title}</p>
          <p>Favorites: {details?.favorites}</p>
          <p>Members: {details?.members}</p>
          {details?.rating && <p>Rating: {details?.rating}</p>}
          <p>Type: {details?.type}</p>
          {details?.status && <p>Status: {details?.status}</p>}
          {details?.source && <p>Source: {details?.source}</p>}
          {details?.rank && <p>Rank: {details?.rank}</p>}
          {details?.score && <p>Score: {details?.score}</p>}
        </div>
      </div>
      <div className={styles.synopsis}>
        <h1>Synopsis</h1>
        <p className={styles.synopsisText}>{details?.synopsis}</p>
      </div>
    </div>
  )
}

export default AnimeDetail
