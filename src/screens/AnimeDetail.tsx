import { useEffect, useState, useCallback, ReactElement } from 'react'
import {
  getAnimeData,
  getAnimeCharacters,
  getAnimeRecommendations,
} from '../service/animeService'
import styles from '../styles/AnimeDetails.module.css'
import ReactPlayer from 'react-player'
import CharactersList from '../components/Characters'
import RecommendationList from '../components/Recommendation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLightbulb,
  faUser,
  faHeart,
  faUsers,
  faPen,
  faWaveSquare,
  faArchive,
  faThermometer,
  faStar,
} from '@fortawesome/free-solid-svg-icons'

interface Match {
  match: {
    params: {
      id: string
    }
  }
}

interface IDetails {
  aired: object
  airing: boolean
  broadcast: string
  duration: string
  episodes: number
  favorites: number
  genres: Array<object>
  image_url: string
  members: number
  popularity: number
  premiered: string
  rating: string
  source: string
  status: string
  synopsis: string
  title: string
  title_english: string
  trailer_url: string
  type: string
  url: string
  rank: number
  score: number
}

interface ICharacter {
  image_url: string
  mal_id: string
  name: string
  role: string
  url: string
  voice_actors: Array<object>
}

interface IRecommendation {
  image_url: string
  mal_id: string
  recommendation_count: number
  recommendation_url: string
  title: string
  url: string
}

const AnimeDetail = ({ match }: Match): ReactElement => {
  const [details, setDetails] = useState<IDetails>()
  const [characters, setCharacters] = useState<ICharacter[]>([])
  const [animeRecommendations, setAnimeRecommendations] = useState<
    IRecommendation[]
  >([])

  const api = useCallback(async () => {
    const data = await getAnimeData(match.params.id)
    console.log('data', data)
    setDetails(data)
  }, [match.params.id, details])

  const getCharactersApi = useCallback(async () => {
    const data = await getAnimeCharacters(match.params.id)
    console.log('characters', data)
    setCharacters(data)
  }, [match.params.id, characters])

  const fetchAnimeRecommendations = useCallback(async () => {
    const data = await getAnimeRecommendations(match.params.id)
    console.log('recommendations', data)
    setAnimeRecommendations(data)
  }, [match.params.id, animeRecommendations])

  useEffect(() => {
    api()
    getCharactersApi()
    fetchAnimeRecommendations()
  }, [])

  return (
    <div className={styles.container}>
      {details?.trailer_url !== null ? (
        <ReactPlayer
          url={details?.trailer_url}
          width='100%'
          height={300}
        ></ReactPlayer>
      ) : (
        <img
          src={'http://localhost:3000/animeHeader.jpg'}
          width='100%'
          height={300}
        ></img>
      )}

      <div className={styles.flex}>
        <img src={details?.image_url} alt='' />
        <div className={styles.textBox}>
          {details?.title_english && (
            <p>
              English Title
              <FontAwesomeIcon className={styles.penIcon} icon={faPen} />:{' '}
              {details?.title_english}
            </p>
          )}
          <p>
            Title
            <FontAwesomeIcon className={styles.penIcon} icon={faPen} />:{' '}
            {details?.title}
          </p>
          <p>
            Favorites
            <FontAwesomeIcon className={styles.favIcon} icon={faHeart} />:{' '}
            {details?.favorites}
          </p>
          <p>
            Members
            <FontAwesomeIcon
              className={styles.usersIcon}
              icon={faUsers}
            />: {details?.members}
          </p>
          {details?.rating && (
            <p>
              Rating
              <FontAwesomeIcon
                className={styles.usersIcon}
                icon={faUser}
              />: {details?.rating}
            </p>
          )}
          <p>
            Type
            <FontAwesomeIcon
              className={styles.typeIcon}
              icon={faArchive}
            />: {details?.type}
          </p>
          {details?.status && (
            <p>
              Status
              <FontAwesomeIcon
                className={styles.waveIcon}
                icon={faWaveSquare}
              />
              : {details?.status}
            </p>
          )}

          {details?.source && (
            <p>
              Source
              <FontAwesomeIcon className={styles.bulbIcon} icon={faLightbulb} />
              : {details?.source}
            </p>
          )}
          {details?.rank && (
            <p>
              Rank{' '}
              <FontAwesomeIcon
                className={styles.thermometerIcon}
                icon={faThermometer}
              />
              : {details?.source}: {details?.rank}
            </p>
          )}
          {details?.score && (
            <p>
              Score{' '}
              <FontAwesomeIcon className={styles.starIcon} icon={faStar} />:{' '}
              {details?.score}
            </p>
          )}
        </div>
      </div>
      <div className={styles.synopsis}>
        <h1>Synopsis</h1>
        <p className={styles.synopsisText}>{details?.synopsis}</p>
      </div>

      {characters?.length > 0 && (
        <div className={styles.charactersDiv}>
          <h1 className={styles.paddingHeading}>Characters</h1>
          <div className={styles.horizontalRow}>
            {characters.map((character) => (
              <CharactersList
                image_url={character.image_url}
                mal_id={character.mal_id}
                name={character.name}
                role={character.role}
                url={character.url}
                voice_actors={character.voice_actors}
                key={character.mal_id}
              ></CharactersList>
            ))}
          </div>
        </div>
      )}

      {animeRecommendations?.length > 0 && (
        <div>
          <h1 className={styles.paddingHeading}>Recommendation</h1>
          <div className={styles.horizontalRow}>
            {animeRecommendations.map((anime) => (
              <RecommendationList
                image_url={anime.image_url}
                mal_id={anime.mal_id}
                recommendation_count={anime.recommendation_count}
                recommendation_url={anime.recommendation_url}
                title={anime.title}
                url={anime.url}
                key={anime.mal_id}
              ></RecommendationList>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AnimeDetail
