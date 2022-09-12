import { useMemo, FC } from 'react'
import { Grid, Typography } from '@mui/material'
import { getDayName, getWeatherType } from '../../utils'
import { Forecast } from '../../types'
import './styles.css'

export const DailyForecastRender: FC<{ forecast: Forecast }> = ({ forecast }) => {
  const {
    temp,
    pop: rainChance,
    pres,
    vis: visibility,
    valid_date: date,
    weather: { code: weatherCode }
  } = forecast

  const dateObj = new Date(date)
  const weatherType = useMemo(() => getWeatherType(weatherCode), [weatherCode])
  const dayName = useMemo(() => getDayName(dateObj.getDay()), [])

  return (
    <div className="day">
      <div className="day-of-week">{dayName}</div>
      <div className="date">{dateObj.getDate()}</div>

      <div className={`bar ${weatherType}`}>
        <div className="weather">
          <svg role="img">
            <use xlinkHref={`#${weatherType}`} width="264" height="166" viewBox="0 0 264 166"></use>
          </svg>
        </div>
        <div className="temperature">
          {temp}
          <span className="degrees">&deg;</span>
        </div>
        <div className="content">
          <div className="precipitation">
            {temp < 3 ? <i className="bi bi-thermometer-snow" /> : <i className="bi bi-umbrella" />}
            {rainChance}%
          </div>
          <div className="low">
            <i className="bi bi-arrows-collapse" />
            {pres} <sub style={{ fontSize: 0.7 + 'rem' }}>mmhg</sub>
          </div>
          <div className="visibility">
            <i className="bi bi-binoculars" />
            {visibility} Km
          </div>
        </div>
      </div>
    </div>
  )
}
