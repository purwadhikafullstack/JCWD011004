import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RequestResetPass from './pages/RequestResetPass'
import VerifyEditAccount from './pages/VerifyEditAccount'
import RequestResendEmail from './pages/RequestResendEmail'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
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
      </Routes>
    </div>
  )
}

export default App
