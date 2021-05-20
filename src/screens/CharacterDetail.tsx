import { useCallback, useState, useEffect } from 'react'
import { getCharacterDetail } from '../service/animeService'
import sanitizeHtml from 'sanitize-html'

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

  const characterApi = useCallback(async () => {
    const data = await getCharacterDetail(match.params.id)
    setCharacterDetail(data)
  }, [match.params.id])

  useEffect(() => {
    characterApi()
  }, [])

  return <div>{/* <p>{}</p> */}</div>
}

export default CharacterDetail
