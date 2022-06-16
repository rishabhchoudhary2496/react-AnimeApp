import { ReactElement, useState } from 'react'
import styles from './Character.module.css'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
interface IRecommendation {
  image_url: string | undefined
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
        <LazyLoadImage
          effect='blur'
          src={image_url}
          className={styles.img}
          height={317}
          alt='anime'
        ></LazyLoadImage>
        <p className={styles.title}>{title}</p>
      </Link>
    </div>
  )
}

export default Recommendation
