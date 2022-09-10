import { KeyboardEvent } from 'react'
import { Card, CardHeader, CardContent, Input, Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export function Header({ inputVal, setInputVal }: { inputVal: string; setInputVal: Function }) {
  const navigate = useNavigate()
  const city = window.location.pathname.split('/').reverse()[0]

  function goToForecast() {
    if (inputVal !== '') {
      setInputVal('')
      navigate(`forecast/${inputVal}`)
    }
  }

  function handleKeyDown({ key }: KeyboardEvent) {
    if (key === 'Enter') {
      goToForecast()
    }
  }

  return (
    <Card sx={{ mb: 2, minWidth: 350, minHeight: 80 }}>
      <CardHeader title={`${city ?? 'City'} Weathercast`} sx={{ textTransform: 'capitalize' }} />
      <CardContent>
        <Input
          placeholder="Enter City Here"
          fullWidth
          value={inputVal}
          onChange={({ target: { value } }) => setInputVal(value)}
          onKeyDown={handleKeyDown}
        />
        <Grid container justifyContent="center" sx={{ my: 1 }}>
          <Button variant="contained" onClick={goToForecast}>
            Search
          </Button>
        </Grid>
      </CardContent>
    </Card>
  )
}
