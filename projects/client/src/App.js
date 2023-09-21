import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import VerifyPage from './pages/VerifyPage'
import RequestResetPass from './pages/RequestResetPass'
import VerifyEditAccount from './pages/VerifyEditAccount'
import RequestResendEmail from './pages/RequestResendEmail'
import UserDashboard from './views/userdashboard/UserDashboard'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/product/:category" element={<ProductPage />}></Route>
        <Route path="/verify/:token" element={<VerifyPage />}></Route>
        <Route
          path="/reset-password/:token"
          element={<RequestResetPass />}
        ></Route>
        <Route
          path="/verify-updates/:token"
          element={<VerifyEditAccount />}
        ></Route>
        <Route
          path="/verification-page"
          element={<RequestResendEmail />}
        ></Route>
        <Route path="/user-dashboard" element={<UserDashboard />}></Route>
      </Routes>
    </div>
  )
}

export default App
