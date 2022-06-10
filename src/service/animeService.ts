const axios = require('axios')

export const getTopUpcomingAnime = async (page: number) => {
  const URL = `https://api.jikan.moe/v3/top/anime/${page}/upcoming`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data?.top
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getTopAiringAnime = async () => {
  const URL = `https://api.jikan.moe/v3/top/anime/1/airing`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data?.top
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getTopAnimeMovies = async () => {
  const URL = `https://api.jikan.moe/v3/top/anime/1/movie`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data?.top
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getTopSpecials = async () => {
  const URL = `https://api.jikan.moe/v3/top/anime/1/special`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data?.top
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getTopTv = async () => {
  const URL = `https://api.jikan.moe/v3/top/anime/1/tv`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data?.top
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getAnimeData = async (animeId: number) => {
  const URL = `https://api.jikan.moe/v3/anime/${animeId}`
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

export const getAnimeCharacters = async (animeId: number) => {
  const URL = `https://api.jikan.moe/v3/anime/${animeId}/characters_staff`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data?.characters
      return data
    }
  } catch (error: unknown) {
    console.log('error', error)
  }
}

export const getAnimeRecommendations = async (animeId: number) => {
  const URL = `https://api.jikan.moe/v3/anime/${animeId}/recommendations`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data?.recommendations
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
  const URL = `https://api.jikan.moe/v3/character/${characterId}`
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

export const getCharacterPictures = async (characterId: number) => {
  const URL = `https://api.jikan.moe/v3/character/${characterId}/pictures`
  try {
    const response = await axios.get(URL)
    if (response?.status === 200) {
      const data = response?.data?.pictures
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
