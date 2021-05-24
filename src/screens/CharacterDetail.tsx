import { useCallback, useState, useEffect } from 'react'
import {
  getCharacterDetail,
  getCharacterPictures,
} from '../service/animeService'
import styles from '../styles/CharacterDetails.module.css'
import LoadingSpinner from '../components/Loader'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Swiper, SwiperSlide } from 'swiper/react'
import breakpoints from '../utils/breakpoints'
interface Match {
  match: {
    params: {
      id: string
    }
  }
}

interface IVoiceActor {
  image_url: string
  language: string
  mal_id: string
  name: string
  url: string
}

interface IAnimeGraphy {
  image_url: string
  mal_id: string
  name: string
  role: 'Main'
  url: string
}

interface IManoGraphy {
  image_url: string
  mal_id: string
  name: string
  role: string
  url: string
}
interface ICharacter {
  about: string
  animeography: Array<IAnimeGraphy>
  image_url: string
  mal_id: string
  mangaography: Array<IManoGraphy>
  member_favorites: number
  name: string
  name_kanji: string
  nicknames: Array<string>
  url: string
  voice_actors: Array<IVoiceActor>
}

interface IPicture {
  large: string
  small: string
}

const CharacterDetail = ({ match }: Match) => {
  const [characterDetail, setCharacterDetail] = useState<ICharacter>()
  const [loading, setLoading] = useState(false)
  const [imgLoaded, setImageLoaded] = useState(false)
  const [pictures, setPictures] = useState<IPicture[]>()

  const characterApi = useCallback(async () => {
    setLoading(true)
    const data = await getCharacterDetail(match.params.id)
    setLoading(false)
    console.log('data', data)
    setCharacterDetail(data)
  }, [match.params.id])

  const characterPicturesApi = useCallback(async () => {
    const data = await getCharacterPictures(match.params.id)
    console.log('d', data)
    setPictures(data)
  }, [[match.params.id]])

  const formatted = characterDetail?.about.replaceAll('\n', '<br>')

  console.log('imgLoaded', imgLoaded)
  useEffect(() => {
    characterApi()
    characterPicturesApi()
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
        <div className={styles.flex}>
          <h1>About</h1>
          <div className={styles.profile}>
            <LazyLoadImage
              effect='blur'
              src={characterDetail?.image_url}
              width={225}
              height={317}
              alt=''
            />

            <p className={styles.name}>
              {characterDetail?.name} ({characterDetail?.name_kanji})
            </p>
          </div>
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

        {characterDetail?.animeography &&
          characterDetail?.animeography.length > 0 && (
            <div className={styles.pictureBox}>
              <h1 style={{ textAlign: 'center' }}>Animeography</h1>
              <Swiper
                spaceBetween={4}
                slidesPerView={4.7}
                breakpoints={breakpoints}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {characterDetail?.animeography.map((animeCharacter) => (
                  <SwiperSlide>
                    <div className={styles.profile}>
                      <LazyLoadImage
                        effect='blur'
                        src={animeCharacter?.image_url}
                        className={styles.img}
                        height={317}
                        width={225}
                        alt=''
                      />
                      <p className={styles.name}>{animeCharacter?.name}</p>
                      <p className={styles.name}>{animeCharacter?.role}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        {characterDetail?.mangaography &&
          characterDetail?.mangaography.length > 0 && (
            <div className={styles.pictureBox}>
              <h1 style={{ textAlign: 'center' }}>Mangaography</h1>
              <Swiper
                spaceBetween={4}
                slidesPerView={4.7}
                breakpoints={breakpoints}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {characterDetail?.mangaography.map((mangaCharacter) => (
                  <SwiperSlide>
                    <div className={styles.profile}>
                      <LazyLoadImage
                        effect='blur'
                        src={mangaCharacter?.image_url}
                        className={styles.img}
                        height={317}
                        width={225}
                        alt=''
                      />
                      <p className={styles.name}>{mangaCharacter?.name}</p>
                      <p className={styles.name}>{mangaCharacter?.role}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

        {characterDetail?.voice_actors &&
          characterDetail.voice_actors.length > 0 && (
            <div className={styles.pictureBox}>
              <h1 style={{ textAlign: 'center' }}>Voice Actors</h1>
              <Swiper
                spaceBetween={4}
                slidesPerView={4.7}
                breakpoints={breakpoints}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {characterDetail.voice_actors.map((actor) => (
                  <SwiperSlide>
                    <div className={styles.profile}>
                      <LazyLoadImage
                        effect='blur'
                        src={actor?.image_url}
                        height={317}
                        alt=''
                      />
                      <p className={styles.name}>{actor?.name}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

        {pictures && pictures.length > 0 && (
          <div className={styles.pictureBox}>
            <h1 style={{ textAlign: 'center' }}>Pictures</h1>
            <Swiper
              spaceBetween={4}
              slidesPerView={4.7}
              breakpoints={breakpoints}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {pictures.map((image) => (
                <SwiperSlide>
                  <div>
                    <LazyLoadImage
                      effect='blur'
                      height={317}
                      className={styles.profile}
                      src={image?.large}
                      alt=''
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    )
  }
}

export default CharacterDetail
