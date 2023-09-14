import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CardProductDetail from '../src/components/card/cardProductDetail'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/product/:id" element={<CardProductDetail />}></Route>
      </Routes>
    </div>
  )
}

export default App
