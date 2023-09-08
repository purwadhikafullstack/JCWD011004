import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
      </Routes>
    </div>
  )
}

export default App
