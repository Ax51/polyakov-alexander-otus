import { useState, useEffect } from 'react'
import { Grid, Typography, CircularProgress } from '@mui/material'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import { FetchForecast } from '../types'
import { DailyForecastRender } from './DailyForecastRender'
import { useForecast } from '../utils'

export function Forecast() {
  const { city } = useParams()
  const { forecast, isFetching, error } = useForecast(city)

  return (
    <Grid container>
      {error && (
        <Typography variant="h4" color="text.primary" textAlign="center">
          Oops... Something went wrong. Please, enter another city or try again later
        </Typography>
      )}
      {isFetching && (
        <Grid container justifyContent="center" sx={{ my: 3 }}>
          <CircularProgress size={60} />
        </Grid>
      )}
      {forecast && (
        <Grid container spacing={2} justifyContent="space-around">
          {forecast.data.map(day => (
            <DailyForecastRender key={day.datetime} forecast={day} />
          ))}
        </Grid>
      )}
    </Grid>
  )
}
