import { useState } from 'react'
import '../css/App.css'

import MainLayout from './components/MainLayout/MainLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MainLayout />
    </div>

  )
}

export default App
