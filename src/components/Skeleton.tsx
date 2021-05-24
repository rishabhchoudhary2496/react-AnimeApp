import Shimmer from 'react-shimmer-effect'
import styles from './Skeleton.module.css'

const Skeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgPlaceholder}></div>
      <div className={styles.text}></div>
    </div>
  )
}

export default Skeleton
