import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  const apiKey = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
    if (!capital) return

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: capital,
              appid: apiKey,
              units: 'metric'
            }
          }
        )

        setWeather(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch weather data')
        setWeather(null)
      }
    }

    fetchWeather()
  }, [capital, apiKey])

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!weather) return <p>Loading weather...</p>

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature {weather.main.temp} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
