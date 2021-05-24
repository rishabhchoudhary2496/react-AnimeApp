import React, { ReactElement, useState } from 'react'
import styles from './Character.module.css'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
interface ICharacter {
  image_url: string
  mal_id: string
  name: string
  role: string
  url: string
  voice_actors: Array<object>
}

const Characters = ({
  image_url,
  mal_id,
  name,
  role,
  url,
  voice_actors,
}: ICharacter): ReactElement => {
  return (
    <div className={styles.card}>
      <Link to={`/characterDetails/${mal_id}`}>
        <LazyLoadImage
          effect='blur'
          src={image_url}
          className={styles.img}
          height={317}
          alt='character'
        ></LazyLoadImage>
        <p className={styles.title}>{name}</p>
        <p className={styles.title}>{role}</p>
      </Link>
    </div>
  )
}

export default Characters
