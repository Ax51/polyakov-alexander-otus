export function getWeatherType(weatherCode: number) {
  if (weatherCode >= 200 && weatherCode < 300) {
    return 'stormy'
  } else if (weatherCode >= 500 && weatherCode < 600) {
    return 'rainy'
  } else if (
    (weatherCode >= 600 && weatherCode < 700) ||
    (weatherCode >= 300 && weatherCode < 400)
  ) {
    return 'snowy'
  } else if (weatherCode === 800) {
    return 'sunny'
  } else if (weatherCode >= 801 && weatherCode < 900) {
    return 'partly-cloudy'
  } else {
    return 'cloudy'
  }
}
