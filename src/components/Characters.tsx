import React, { ReactElement } from 'react'
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
  return (
    <Link to={`/characterDetails/${mal_id}`}>
      <div className={styles.card}>
        <img src={image_url} alt='character'></img>
        <p className={styles.title}>{name}</p>
        <p className={styles.title}>{role}</p>
      </div>
    </Link>
  )
}

export default Characters
