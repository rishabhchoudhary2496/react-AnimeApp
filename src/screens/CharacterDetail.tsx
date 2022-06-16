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
import { Link } from 'react-router-dom'
interface Match {
  match: {
    params: {
      id: number
    }
  }
}

interface IVoiceActor {
  person: {
    mal_id: string
    url: string
    name: string
    images: {
      jpg?: {
        image_url?: string
        small_image_url?: string
        large_image_url?: string
      }
      webp?: {
        image_url?: string
        small_image_url?: string
        large_image_url?: string
      }
    }
  }
  language: string
}

interface IAnimeRelated {
  role: string
  anime: {
    mal_id: string
    url: string
    images: {
      jpg?: {
        image_url?: string
        small_image_url?: string
        large_image_url?: string
      }
      webp?: {
        image_url?: string
        small_image_url?: string
        large_image_url?: string
      }
    }
    title: string
  }
}

interface IMangaRelated {
  role: string
  manga: {
    mal_id: string
    url: string
    images: {
      jpg?: {
        image_url?: string
        small_image_url?: string
        large_image_url?: string
      }
      webp?: {
        image_url?: string
        small_image_url?: string
        large_image_url?: string
      }
    }
    title: string
  }
}
interface ICharacter {
  about: string
  anime: Array<IAnimeRelated>
  images: {
    jpg?: {
      image_url?: string
      small_image_url?: string
      large_image_url?: string
    }
    webp?: {
      image_url?: string
      small_image_url?: string
      large_image_url?: string
    }
  }
  mal_id: string
  manga: Array<IMangaRelated>
  favorites: number
  name: string
  name_kanji: string
  nicknames: Array<string>
  url: string
  voices: Array<IVoiceActor>
}

interface IPicture {
  jpg: {
    image_url: string
  }
}

const CharacterDetail = ({ match }: Match) => {
  const [characterDetail, setCharacterDetail] = useState<ICharacter>()
  const [loading, setLoading] = useState(false)
  const [imgLoaded, setImageLoaded] = useState(false)
  const [pictures, setPictures] = useState<IPicture[]>()

  const characterApi = useCallback(async () => {
    setLoading(true)
    const data = await getCharacterDetail(match?.params?.id)
    setLoading(false)
    setCharacterDetail(data)
  }, [match.params.id])

  const characterPicturesApi = useCallback(async () => {
    const data = await getCharacterPictures(match?.params?.id)

    setPictures(data)
  }, [match.params.id])

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
              src={characterDetail?.images?.jpg?.image_url}
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

        {characterDetail?.anime && characterDetail?.anime.length > 0 && (
          <div className={styles.pictureBox}>
            <h1 style={{ textAlign: 'center' }}>Anime</h1>
            <Swiper
              spaceBetween={4}
              slidesPerView={4.7}
              breakpoints={breakpoints}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {characterDetail?.anime.map((animeCharacter) => (
                <SwiperSlide>
                  <div className={styles.profile}>
                    <Link to={`/animeDetails/${animeCharacter?.anime?.mal_id}`}>
                      <LazyLoadImage
                        effect='blur'
                        src={
                          animeCharacter?.anime?.images?.jpg?.large_image_url
                        }
                        className={styles.img}
                        height={317}
                        width={225}
                        alt=''
                      />
                      <p className={styles.name}>
                        {animeCharacter?.anime?.title}
                      </p>
                      <p className={styles.name}>{animeCharacter?.role}</p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        {characterDetail?.manga && characterDetail?.manga.length > 0 && (
          <div className={styles.pictureBox}>
            <h1 style={{ textAlign: 'center' }}>Manga</h1>
            <Swiper
              spaceBetween={4}
              slidesPerView={4.7}
              breakpoints={breakpoints}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {characterDetail?.manga.map((mangaCharacter) => (
                <SwiperSlide>
                  <div className={styles.profile}>
                    <LazyLoadImage
                      effect='blur'
                      src={mangaCharacter?.manga?.images?.jpg?.large_image_url}
                      className={styles.img}
                      height={317}
                      width={225}
                      alt=''
                    />
                    <p className={styles.name}>
                      {mangaCharacter?.manga?.title}
                    </p>
                    <p className={styles.name}>{mangaCharacter?.role}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {characterDetail?.voices && characterDetail.voices.length > 0 && (
          <div className={styles.pictureBox}>
            <h1 style={{ textAlign: 'center' }}>Voice Actors</h1>
            <Swiper
              spaceBetween={4}
              slidesPerView={4.7}
              breakpoints={breakpoints}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {characterDetail.voices.map((actor) => (
                <SwiperSlide>
                  <div className={styles.profile}>
                    <LazyLoadImage
                      effect='blur'
                      src={actor?.person?.images?.jpg?.image_url}
                      height={317}
                      alt=''
                    />
                    <p className={styles.name}>{actor?.person?.name}</p>
                    <span className={styles.name}>{actor?.language}</span>
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
                      src={image?.jpg?.image_url}
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
