import Search from '../components/Search'
import styles from '../styles/SearchResult.module.css'
import { useLocation } from 'react-router-dom'
import ResultCard from '../components/ResultCard'
import moment from 'moment'

interface IAnimeResult {
  airing: boolean
  end_date: string
  episodes: string
  image_url: string
  mal_id: string
  members: string
  rated: string
  score: number
  start_date: string
  synopsis: string
  title: string
  type: string
  url: string
}

interface Idata {
  data: Array<IAnimeResult>
}

const SearchResult = () => {
  const location = useLocation()

  const result = location.state as Idata

  if (!result?.data) {
    return (
      <div className={styles.container}>
        <Search />
        <h2 style={{ textAlign: 'center' }}>No Result Found</h2>
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <Search />
        <h2 style={{ textAlign: 'center' }}>Search Result</h2>
        <div className={styles['flex-grid']}>
          {result &&
            result?.data?.map((anime) => (
              <div className={styles['col']}>
                <ResultCard
                  airing={anime?.airing}
                  end_date={anime?.end_date}
                  episodes={anime?.episodes}
                  image_url={anime?.image_url}
                  mal_id={anime?.mal_id}
                  members={anime?.members}
                  rated={anime?.rated}
                  score={anime?.score}
                  start_date={moment(anime?.start_date).format('MMMM Do YYYY')}
                  synopsis={anime?.synopsis}
                  title={anime?.title}
                  type={anime?.type}
                  url={anime.url}
                />
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default SearchResult
