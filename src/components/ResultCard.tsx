import { ReactElement, useState } from 'react'
import styles from './Card.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface CardProps {
  airing: boolean
  end_date: string
  episodes: string
  image_url: string
  mal_id: string
  members: string
  rated: string
  score: number
  start_date: string
  synopsis: string
  title: string
  type: string
  url: string
}

const ResultCard = ({
  airing,
  end_date,
  episodes,
  image_url,
  mal_id,
  members,
  rated,
  score,
  start_date,
  synopsis,
  title,
  type,
  url,
}: CardProps): ReactElement => {
  return (
    <div className={styles.card}>
      <Link to={`/animeDetails/${mal_id}`}>
        <LazyLoadImage
          effect='blur'
          src={image_url}
          height={317}
          className={styles.img}
          alt='poster'
        ></LazyLoadImage>
        <p className={styles.title}>{title}</p>
        {start_date && (
          <p className={styles.startDate}>
            <FontAwesomeIcon
              className={styles.calendarIcon}
              icon={faCalendar}
            />
            {''}
            Airing {start_date}
          </p>
        )}
        {score > 0 && (
          <p className={styles.score}>
            {' '}
            <FontAwesomeIcon className={styles.starIcon} icon={faStar} />{' '}
            {score}
          </p>
        )}
      </Link>
    </div>
  )
}

export default ResultCard
