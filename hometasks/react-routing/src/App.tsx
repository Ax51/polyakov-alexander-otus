import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Window, Header, Forecast } from './components'

function App() {
  const [inputCity, setInputCity] = useState<string>('')
  return (
    <Window>
      <BrowserRouter>
        <Header inputVal={inputCity} setInputVal={setInputCity} />
        <Routes>
          <Route path="forecast/:city" element={<Forecast />} />
        </Routes>
      </BrowserRouter>
    </Window>
  )
}

export default App
