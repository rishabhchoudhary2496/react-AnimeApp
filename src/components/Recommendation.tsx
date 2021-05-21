import { ReactElement } from 'react'
import styles from './Character.module.css'
import { Link } from 'react-router-dom'

interface IRecommendation {
  image_url: string
  mal_id: string
  recommendation_count: number
  recommendation_url: string
  title: string
  url: string
}

const Recommendation = ({
  image_url,
  mal_id,
  recommendation_count,
  title,
  url,
}: IRecommendation): ReactElement => {
  return (
    <div className={styles.card}>
      <Link to={`/animeDetails/${mal_id}`}>
        <img src={image_url} alt='anime'></img>
        <p className={styles.title}>{title}</p>
      </Link>
    </div>
  )
}

export default Recommendation
