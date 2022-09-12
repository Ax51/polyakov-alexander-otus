import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { FetchForecast } from '../types'

export function useForecast(city?: string) {
  const [forecast, setForecast] = useState<null | FetchForecast>(null)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<null | Error>(null)

  function resetState() {
    setForecast(null)
    setIsFetching(true)
    setError(null)
  }

  const fetchAndSetForecast = useCallback(() => {
    axios
      .get<FetchForecast | string>(
        `https://api.weatherbit.io/v2.0/forecast/daily?lang=ru&days=3&city=${city},RU&key=b3e5096601344bde837e2aa622e5cb61`
      )
      .then(({ data }) => {
        if (typeof data !== 'string' && typeof city === 'string') {
          localStorage.setItem(city, JSON.stringify(data))
          setForecast(data)
        } else {
          setError(new Error('No weathercast'))
        }
      })
      .catch(err => {
        setError(new Error('Error while fetching weather forecast'))
      })
      .finally(() => setIsFetching(false))
  }, [city])

  useEffect(() => {
    resetState()
    if (typeof city === 'string') {
      const storedData = localStorage.getItem(city)
      if (storedData) {
        const localData: FetchForecast = JSON.parse(storedData)
        if (localData) {
          const lastSavedDay = localData.data[localData.data.length - 1].valid_date.split('-')
          const now = new Date()
          const thisDay = [now.getFullYear(), now.getMonth(), now.getDate()]
          let isExpired = false
          lastSavedDay.forEach((i, b) => {
            if (+i < thisDay[b]) {
              isExpired = true
            }
          })
          if (!isExpired) {
            setForecast(localData)
            setIsFetching(false)
          } else {
            localStorage.removeItem(city)
            fetchAndSetForecast()
          }
        }
      } else {
        fetchAndSetForecast()
      }
    } else {
      setError(new Error('Wrong city input'))
    }
  }, [city])
  return { forecast, isFetching, error }
}
