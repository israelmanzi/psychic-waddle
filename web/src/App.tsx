import './index.css'
import BaseLayout from './layouts/baseLayout'
import Home from './pages/home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NewGame from './pages/newGame'
import Game from './pages/game'

function App() {
  return (
    <BaseLayout>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/newgame' element={<NewGame />} />
          <Route path='/game/:id' element={<Game />} />
        </Routes>
      </Router>
    </BaseLayout>
  )
}

export default App
