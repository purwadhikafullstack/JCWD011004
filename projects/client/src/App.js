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
import CartItemPages from './pages/CartItemPages'
import Warehouse from './components/warehouse/Warehouse'
import ProductTable from './components/productAdmin/ProductTable'
import CategoryTable from './components/categoryAdmin/CategoryTable'
import CreateWarehousePage from './components/warehouse/component/CreateWarehouse'
import EditWarehousePage from './components/warehouse/component/EditWarehouse'
import ModalDelete from './components/warehouse/component/ModalDelete'
import AdminDashboard from './views/adminDashboard/AdminDashboard'
import DashboardReport from './views/adminDashboard/component/DashboardReport'
import UserTable from './views/adminDashboard/component/components/UserTable'
import ResidentTable from './views/adminDashboard/component/components/ResidentTable'
import VerifyAdminChangePassword from './pages/VerifyAdminChangePassword'
import PagesNotFound from './pages/PagesNotFound'
import TabelSuperAdmin from './components/adminFilter/SuperAdmin/TabelSuperAdmin'
import TabelStock from './components/stock/tabelStock'
import TabelAdminWarehouse from './components/adminFilter/AdminWarehouse/TabelAdminWarehouse'
import SalesReport from './components//report/salesReport'
import Report from './components/report/report'

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
        <Route
          path="/verify-admin/:token"
          element={<VerifyAdminChangePassword />}
        ></Route>
        <Route path="/cart" element={<CartItemPages />}></Route>
        <Route path="/warehouse" element={<Warehouse />}></Route>
        <Route
          path="/create-warehouse"
          element={<CreateWarehousePage />}
        ></Route>
        <Route
          path="/edit-warehouse/:id"
          element={<EditWarehousePage />}
        ></Route>
        <Route path="/delete-modal" element={<ModalDelete />}></Route>
        <Route path="/admin/*" element={<AdminDashboard />}>
          <Route index element={<DashboardReport />} />
          <Route path="dashboard-report" element={<DashboardReport />} />
          <Route path="user" element={<UserTable />} />
          <Route path="product" element={<ProductTable />} />
          <Route path="category" element={<CategoryTable />} />
          <Route path="resident" element={<ResidentTable />} />
          <Route path="warehouse" element={<Warehouse />} />
          <Route path="order" element={<TabelSuperAdmin />} />
          <Route path="tabel-stock" element={<TabelStock />} />
          <Route path="report-sales" element={<SalesReport />} />
          <Route path="order-admin/:id" element={<TabelAdminWarehouse />} />
          <Route path="report" element={<Report />}></Route>
        </Route>
        <Route path="*" element={<PagesNotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App
