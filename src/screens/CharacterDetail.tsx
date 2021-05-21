import { useCallback, useState, useEffect } from 'react'
import { getCharacterDetail } from '../service/animeService'
import styles from '../styles/CharacterDetails.module.css'
import Loader from 'react-loader-spinner'
interface Match {
  match: {
    params: {
      id: string
    }
  }
}

interface ICharacter {
  about: string
  animeography: Array<object>
  image_url: string
  mal_id: string
  mangaography: Array<object>
  member_favorites: number
  name: string
  name_kanji: string
  nicknames: Array<string>
  url: string
  voice_actors: Array<object>
}

const CharacterDetail = ({ match }: Match) => {
  const [characterDetail, setCharacterDetail] = useState<ICharacter>()
  const [loading, setLoading] = useState(false)
  const [imgLoaded, setImageLoaded] = useState(false)

  const characterApi = useCallback(async () => {
    setLoading(true)
    const data = await getCharacterDetail(match.params.id)
    setLoading(false)
    console.log('data', data)
    setCharacterDetail(data)
  }, [match.params.id])

  const formatted = characterDetail?.about.replaceAll('\n', '<br>')

  console.log('imgLoaded', imgLoaded)
  useEffect(() => {
    characterApi()
  }, [])

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader
          type='Circles'
          color='#474787'
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <h1>About</h1>
        <div className={styles.profile}>
          <img
            style={imgLoaded ? {} : { display: 'none' }}
            src={characterDetail?.image_url}
            width={225}
            height={317}
            alt=''
            onLoad={() => {
              setImageLoaded(true)
            }}
          />

          <p className={styles.name}>
            {characterDetail?.name} ({characterDetail?.name_kanji})
          </p>
        </div>

        <div className={styles.aboutBox}>
          <p>
            {characterDetail?.about.split('\\n').map((item, index) => (
              <span key={index}>
                {item}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>
    )
  }
}

export default CharacterDetail
