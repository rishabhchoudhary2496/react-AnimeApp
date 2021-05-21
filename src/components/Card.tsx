import { ReactElement, useState } from 'react'
import styles from './Card.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCalendar } from '@fortawesome/free-solid-svg-icons'
interface CardProps {
  end_date: Date | null
  episodes: Number | null
  image_url: string
  mal_id: number
  members: number
  rank: number
  score: number
  start_date: Date
  title: string
  type: string
  url: string
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
}: CardProps): ReactElement => {
  const [imgLoaded, setImageLoaded] = useState(false)
  return (
    <div className={styles.card}>
      <Link to={`/animeDetails/${mal_id}`}>
        <img
          style={
            imgLoaded
              ? {}
              : {
                  backgroundColor: 'transparent',
                }
          }
          src={image_url}
          width={'100%'}
          height='auto'
          alt='poster'
          onLoad={() => {
            setImageLoaded(true)
          }}
        ></img>
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

export default Card
