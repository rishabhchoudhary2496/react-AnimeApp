import React, { useState, useEffect, useCallback } from 'react'
import { getAnimeReviews } from '../service/animeService'
import styles from '../styles/Review.module.css'
import LoadingSpinner from '../components/Loader'

interface IScores {
  animation: number
  character: number
  enjoyment: number
  overall: number
  sound: number
  story: number
}
interface IReviewer {
  url: string
  image_url: string
  username: string
  episodes_seen: number
  scores: IScores
}

interface IReview {
  content: string
  date: string
  helpful_count: string
  mal_id: string
  reviewer: IReviewer
  type: string
  url: string
}

interface Match {
  match: {
    params: {
      id: number
    }
  }
}

const Review = ({ match }: Match) => {
  const [reviews, setReviews] = useState<IReview[]>()
  const [loading, setLoading] = useState(false)

  const fetchReviews = useCallback(async () => {
    setLoading(true)
    const data = await getAnimeReviews(match?.params?.id)
    console.log('data', data)
    setLoading(false)
    setReviews(data)
  }, [match.params.id])

  useEffect(() => {
    fetchReviews()
  }, [])

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        {reviews?.length === 0 && (
          <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>
            No Reviews Found
          </h2>
        )}
        {reviews &&
          reviews?.map((review) => (
            <div className={styles.review}>
              <div className={styles.flex}>
                <img
                  className={styles.dp}
                  src={review?.reviewer?.image_url}
                  alt=''
                />
                <p className={styles.username}>{review?.reviewer.username}</p>
              </div>
              <div>
                <h2>Scores</h2>
                <div className={styles.flex}>
                  {review?.reviewer?.scores?.animation > 0 && (
                    <div className={styles.score}>
                      <p>Animation</p>
                      <p>{review?.reviewer.scores.animation}</p>
                    </div>
                  )}

                  {review?.reviewer?.scores?.character > 0 && (
                    <div className={styles.score}>
                      <p>Character</p>
                      <p>{review?.reviewer.scores.character}</p>
                    </div>
                  )}

                  {review?.reviewer?.scores?.enjoyment > 0 && (
                    <div className={styles.score}>
                      <p>Enjoyment</p>
                      <p>{review?.reviewer.scores.enjoyment}</p>
                    </div>
                  )}

                  {review?.reviewer?.scores?.sound > 0 && (
                    <div className={styles.score}>
                      <p>Sound</p>
                      <p>{review?.reviewer.scores.sound}</p>
                    </div>
                  )}

                  {review?.reviewer?.scores?.story > 0 && (
                    <div className={styles.score}>
                      <p>Story</p>
                      <p>{review?.reviewer.scores.story}</p>
                    </div>
                  )}

                  {review?.reviewer?.scores?.overall > 0 && (
                    <div className={styles.score}>
                      <p>Overall</p>
                      <p>{review?.reviewer.scores.overall}</p>
                    </div>
                  )}
                </div>
              </div>
              {review?.content.split('\\n').map((item, index) => (
                <span key={index} className={styles.content}>
                  {item}
                  <br />
                </span>
              ))}
            </div>
          ))}
      </div>
    )
  }
}

export default Review
