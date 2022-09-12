export function getDayName(day = new Date().getDay()) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return dayNames[day] ?? 'Day'
}
