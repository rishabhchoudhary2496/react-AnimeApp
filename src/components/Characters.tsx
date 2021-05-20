import React, { ReactElement } from 'react'
import styles from './Character.module.css'

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
      <img src={image_url} alt='character'></img>
      <p className={styles.title}>{name}</p>
      <p className={styles.title}>{role}</p>
    </div>
  )
}

export default Characters
