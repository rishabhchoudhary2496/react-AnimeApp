import { useEffect, useState, useCallback, ReactElement, useRef } from 'react'
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
import { Swiper, SwiperSlide } from 'swiper/react'
import breakpoints from '../utils/breakpoints'
import LoadingSpinner from '../components/Loader'
import { LazyLoadImage } from 'react-lazy-load-image-component'
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
  episodes: string
  favorites: string
  genres: Array<object>
  image_url: string
  members: string
  popularity: string
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
  rank: string
  score: string
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

const emptyDetails: IDetails = {
  aired: {},
  airing: false,
  broadcast: '',
  duration: '',
  episodes: '',
  favorites: '',
  genres: [],
  image_url: '',
  members: '',
  popularity: '',
  premiered: '',
  rating: '',
  source: '',
  status: '',
  synopsis: '',
  title: '',
  title_english: '',
  trailer_url: '',
  type: '',
  url: '',
  rank: '',
  score: '',
}

const AnimeDetail = ({ match }: Match): ReactElement => {
  const [details, setDetails] = useState<IDetails>()
  const [loadingDetails, setLoadingDetails] = useState(true)
  const [characters, setCharacters] = useState<ICharacter[]>([])
  const [animeRecommendations, setAnimeRecommendations] = useState<
    IRecommendation[]
  >([])

  const ref = useRef<HTMLSpanElement>(null)

  const api = useCallback(async () => {
    const data = await getAnimeData(match.params.id)
    console.log('data', data)
    setDetails(data)
    setLoadingDetails(false)
  }, [match.params.id])

  const getCharactersApi = useCallback(async () => {
    const data = await getAnimeCharacters(match.params.id)
    console.log('characters', data)
    setCharacters(data)
  }, [match.params.id])

  const fetchAnimeRecommendations = useCallback(async () => {
    const data = await getAnimeRecommendations(match.params.id)
    console.log('recommendations', data)
    setAnimeRecommendations(data)
  }, [match.params.id])

  useEffect(() => {
    console.log('called')
    setDetails(emptyDetails)
    setCharacters([])
    setAnimeRecommendations([])
  }, [match.params.id])

  useEffect(() => {
    if (ref.current) {
      ref.current?.scrollIntoView()
    }
    api()
    getCharactersApi()
    fetchAnimeRecommendations()
  }, [api, getCharactersApi, fetchAnimeRecommendations])

  if (loadingDetails) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <span ref={ref}></span>
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
          <div style={{ width: '225px' }}>
            {details?.image_url && (
              <LazyLoadImage effect='blur' src={details?.image_url} alt='' />
            )}
          </div>
          <div className={styles.textBox}>
            {details?.title_english && (
              <p>
                English Title
                <FontAwesomeIcon
                  className={styles.penIcon}
                  icon={faPen}
                />: {details?.title_english}
              </p>
            )}
            {details?.title && (
              <p>
                Title
                <FontAwesomeIcon
                  className={styles.penIcon}
                  icon={faPen}
                />: {details?.title}
              </p>
            )}

            {details?.favorites && (
              <p>
                Favorites
                <FontAwesomeIcon
                  className={styles.favIcon}
                  icon={faHeart}
                />: {details?.favorites}
              </p>
            )}

            {details?.members && (
              <p>
                Members
                <FontAwesomeIcon
                  className={styles.usersIcon}
                  icon={faUsers}
                />: {details?.members}
              </p>
            )}

            {details?.rating && (
              <p>
                Rating
                <FontAwesomeIcon
                  className={styles.usersIcon}
                  icon={faUser}
                />: {details?.rating}
              </p>
            )}
            {details?.type && (
              <p>
                Type
                <FontAwesomeIcon className={styles.typeIcon} icon={faArchive} />
                : {details?.type}
              </p>
            )}

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
                <FontAwesomeIcon
                  className={styles.bulbIcon}
                  icon={faLightbulb}
                />
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
                : {details?.rank}
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
        {details?.synopsis && (
          <div className={styles.synopsis}>
            <h1>Synopsis</h1>
            <p className={styles.synopsisText}>{details?.synopsis}</p>
          </div>
        )}

        {characters?.length > 0 && (
          <div className={styles.charactersDiv}>
            <h1 className={styles.paddingHeading}>Characters</h1>
            <Swiper
              spaceBetween={4}
              slidesPerView={4.7}
              breakpoints={breakpoints}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {characters.map((character) => (
                <SwiperSlide>
                  <CharactersList
                    image_url={character.image_url}
                    mal_id={character.mal_id}
                    name={character.name}
                    role={character.role}
                    url={character.url}
                    voice_actors={character.voice_actors}
                    key={character.mal_id}
                  ></CharactersList>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {animeRecommendations?.length > 0 && (
          <div>
            <h1 className={styles.paddingHeading}>Recommendation</h1>
            <Swiper
              spaceBetween={4}
              slidesPerView={4.7}
              breakpoints={breakpoints}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {animeRecommendations.map((anime) => (
                <SwiperSlide>
                  <RecommendationList
                    image_url={anime.image_url}
                    mal_id={anime.mal_id}
                    recommendation_count={anime.recommendation_count}
                    recommendation_url={anime.recommendation_url}
                    title={anime.title}
                    url={anime.url}
                    key={anime.mal_id}
                  ></RecommendationList>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    )
  }
}

export default AnimeDetail
