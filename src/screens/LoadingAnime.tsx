import React from 'react'
import Skeleton from '../components/Skeleton'
import styles from '../styles/Home.module.css'

function LoadingAnime() {
  return (
    <div className={styles.horizontalRow}>
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
    </div>
  )
}

export default LoadingAnime
