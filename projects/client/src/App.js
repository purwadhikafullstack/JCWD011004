import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import VerifyPage from './pages/VerifyPage'
import RequestResetPass from './pages/RequestResetPass'
import ProductDetail from './pages/ProductDetail'
import VerifyEditAccount from './pages/VerifyEditAccount'
import RequestResendEmail from './pages/RequestResendEmail'
import VerifyUpdatePassword from './pages/VerifyUpdatePassword'
import UserDashboardPage from './pages/UserDashboardPage'
import SidebarPemesanan from './components/transactionPage/SidebarPemesanan'
import SidebarPemesananPaymentWaiting from './components/transactionPage/tableTransactionStatus/1.transactionWaitPayment/SidebarWaitPayment'
import SidebarPemesananProcces from './components/transactionPage/tableTransactionStatus/2.transactionProgress/SidebarDashboardInProcces'
import SidebarPemesananDelivery from './components/transactionPage/tableTransactionStatus/3.transactionShipmed/SidebarDelivery'
import SidebarPemesananDiterima from './components/transactionPage/tableTransactionStatus/4.transactionAccepting/SidebarDiterima'
import SidebarPemesananCancel from './components/transactionPage/tableTransactionStatus/5.transactionCancel/SidebarCancel'
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
        <Route path="/product/detail/:id" element={<ProductDetail />}></Route>
        <Route
          path="/verify-updates/:token"
          element={<VerifyEditAccount />}
        ></Route>
        <Route
          path="/verify-password-changes/:token"
          element={<VerifyUpdatePassword />}
        ></Route>
        <Route
          path="/verification-page"
          element={<RequestResendEmail />}
        ></Route>
        <Route path="/user-dashboard" element={<UserDashboardPage />}></Route>
        {/* Ini adalah untuk route sidebar ya */}
        <Route path="/sidebar-pemesanan" element={<SidebarPemesanan />}></Route>
        <Route
          path="/sidebar-pemesanan-not-paid"
          element={<SidebarPemesananPaymentWaiting />}
        ></Route>
        <Route
          path="/sidebar-pemesanan-in-procces"
          element={<SidebarPemesananProcces />}
        ></Route>
        <Route
          path="/sidebar-pemesanan-shipping"
          element={<SidebarPemesananDelivery />}
        ></Route>
        <Route
          path="/sidebar-pemesanan-diterima"
          element={<SidebarPemesananDiterima />}
        ></Route>
        <Route
          path="/sidebar-pemesanan-cancel"
          element={<SidebarPemesananCancel />}
        ></Route>
      </Routes>
    </div>
  )
}

export default App
