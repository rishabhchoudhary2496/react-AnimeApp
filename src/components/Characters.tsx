import React, { ReactElement, useState } from 'react'
import styles from './Character.module.css'
import { Link } from 'react-router-dom'

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
  const [imgLoaded, setImageLoaded] = useState(false)
  return (
    <div className={styles.card}>
      <Link to={`/characterDetails/${mal_id}`}>
        <img
          src={image_url}
          width={'100%'}
          height='auto'
          alt='character'
          onLoad={() => {
            setImageLoaded(true)
          }}
        ></img>
        <p className={styles.title}>{name}</p>
        <p className={styles.title}>{role}</p>
      </Link>
    </div>
  )
}

export default Characters
