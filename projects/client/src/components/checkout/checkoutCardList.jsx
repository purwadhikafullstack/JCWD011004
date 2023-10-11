import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'

function formatRupiah(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(price)
}
function CheckoutCard() {
  const dataItem = useSelector((state) => state.cartItems.totalItemPrice)

  return dataItem.map((item) => (
    <div
      className="justify-between  mb-1 max-[640px]:flex-col max-[640px]:gap-4 rounded-lg bg-white p-3 shadow-md sm:flex sm:justify-start overflow-x-scroll relative"
      key={item.productId}
    >
      <div className="flex justify-center items-center w-full">
        <img
          src={item.productImage}
          alt="product-image"
          className="h-20 rounded-lg max-[640px]:content-center inline-block"
        />
      </div>
      <div className="gap-10 sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">
            {item.productName}
          </h2>
          <div className="text-sm mt-2">
            {formatRupiah(item.totalPrice)} x {item.quantity}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  ))
}

export default CheckoutCard
