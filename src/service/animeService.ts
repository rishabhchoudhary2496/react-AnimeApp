const axios = require('axios')

interface IPagination {
  current_page: number
  has_next_page: boolean
  items: {
    count: number
    total: number
    per_page: number
  }
  last_visible_page: number
}

interface IAnimeData {
  pagination: IPagination
  data: []
}

export const getTopUpcomingAnime = async (page: number) => {
  const URL = `https://api.jikan.moe/v4/seasons/upcoming?page=${page}`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data: IAnimeData = response?.data
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getTopAiringAnime = async (page: number) => {
  console.log('page', page)
  const URL = `https://api.jikan.moe/v4/seasons/now?page=${page}`
  try {
    const response = await axios.get(URL)
    console.log('response airing', response)
    if (response?.status === 200) {
      const data = response?.data
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getTopAnimeMovies = async (page: number) => {
  const URL = `https://api.jikan.moe/v4/top/anime?type=movie&page=${page}`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getTopSpecials = async (page: number) => {
  const URL = `https://api.jikan.moe/v4/top/anime?type=special&page=${page}`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getTopTv = async (page: number) => {
  const URL = `https://api.jikan.moe/v4/top/anime?type=tv&page=${page}`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getTopOva = async (page: number) => {
  const URL = `https://api.jikan.moe/v4/top/anime?type=ova&page=${page}`
  try {
    const response = await axios.get(URL)
    console.log('responseova', response)
    if (response?.status === 200) {
      const data = response?.data
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getAnimeData = async (animeId: number) => {
  const URL = `https://api.jikan.moe/v4/anime/${animeId}/full`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data?.data
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getAnimeCharacters = async (animeId: number) => {
  const URL = `https://api.jikan.moe/v4/anime/${animeId}/characters`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      console.log('response', response)
      const data = response?.data?.data
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getAnimeRecommendations = async (animeId: number) => {
  const URL = `https://api.jikan.moe/v4/anime/${animeId}/recommendations`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data?.data
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getAnimeReviews = async (animeId: number) => {
  const URL = `https://api.jikan.moe/v3/anime/${animeId}/reviews`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data?.reviews
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getCharacterDetail = async (characterId: number) => {
  const URL = `https://api.jikan.moe/v4/characters/${characterId}/full`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data?.data
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getCharacterPictures = async (characterId: number) => {
  const URL = `https://api.jikan.moe/v4/characters/${characterId}/pictures`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data?.data
      return data
    }
  } catch (error: any) {
    console.log('error', error)
  }
}

export const searchAnime = async (query: string) => {
  const URL = `https://api.jikan.moe/v3/search/anime?q=${query}`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = await response?.data
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}
