import { ReactElement, useState } from 'react'
import styles from './Card.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { LazyLoadImage } from 'react-lazy-load-image-component'
interface CardProps {
  end_date: Date | null
  episodes: Number | null
  image_url: string | undefined
  mal_id: number
  members: number
  rank: number
  score: number
  start_date: Date
  title: string
  type: string
  url: string
  status: string | null
}

const Card = ({
  end_date,
  episodes,
  image_url,
  mal_id,
  members,
  rank,
  score,
  start_date,
  title,
  type,
  url,
  status
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
        {
          status && <span className={styles.status}>
            {status}</span>
        }
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

export default Card
