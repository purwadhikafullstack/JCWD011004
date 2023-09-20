import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import VerifyPage from './pages/VerifyPage'
import RequestResetPass from './pages/RequestResetPass'
import ProductDetailPage from './components/card/ProductDetail'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/product/:id" element={<ProductDetailPage />}></Route>
        <Route path="/product/:category" element={<ProductPage />}></Route>
        <Route path="/verify" element={<VerifyPage />}></Route>
        <Route
          path="/reset-password/:token"
          element={<RequestResetPass />}
        ></Route>
      </Routes>
    </div>
  )
}

export default App
