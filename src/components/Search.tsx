import React, { useState } from 'react'
import styles from './Search.module.css'
import { searchAnime } from '../service/animeService'
import { useHistory } from 'react-router-dom'
import Loader from 'react-loader-spinner'

const Search = () => {
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    const data = await searchAnime(value)
    setValue('')
    setLoading(false)

    history.push('/searchResult', { data: data?.results })
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}
      >
        <input
          type='text'
          name=''
          id=''
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.inputText}
        />
        <button className={styles.button}>
          {loading && (
            <div className={styles.btnLoader}>
              <Loader
                type='Oval'
                color='#B33771'
                height={15}
                width={15}
              ></Loader>
            </div>
          )}
          Search
        </button>
      </form>
    </div>
  )
}

export default Search
