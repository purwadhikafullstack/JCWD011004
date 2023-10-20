import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// eslint-disable-next-line no-undef
const apiurl = process.env.REACT_APP_API_BASE_URL

function ConfirmationForm({ data, onClose }) {
  const [paymentProof, setPaymentProof] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleConfirmPayment = async () => {
    try {
      setLoading(true)
      const res = await axios.put(`${apiurl}/transaction/payment/${data?.id}}`)
      console.log(res)
      if (res?.status === 200) {
        toast.success('Payment confirmed', {
          autoClose: 2000,
          position: 'bottom-center'
        })
        onClose(true)
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 2000,
        position: 'bottom-center'
      })
    } finally {
      setLoading(false)
    }
  }
  const handleRejectPayment = async () => {
    try {
      setLoading(true)
      const res = await axios.put(
        `${apiurl}/transaction/reject-payment/${data?.id}}`
      )
      if (res?.status === 200) {
        toast.success('Payment rejected', {
          autoClose: 2000,
          position: 'bottom-center'
        })
        onClose(true)
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 2000,
        position: 'bottom-center'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChangeStatusPayment = async (status, message) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.patch(
        `${apiurl}/transaction/status/${data?.id}`,
        {
          transactionStatusId: status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (res?.status === 200) {
        const toastId = toast.success(`Transaction ${message}`, {
          position: toast.POSITION.BOTTOM_CENTER
        })
        setTimeout(() => {
          toast.dismiss(toastId)
          onClose(true)
        }, 2000)
      }
    } catch (error) {
      const toastId = toast.error(`Failed to ${message}`, {
        position: toast.POSITION.BOTTOM_CENTER
      })
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 2000)
    }
  }

  const handleUpdateStock = async () => {
    try {
      const res = await axios.post(`${apiurl}/stock/create-stock-journal`, {
        warehouseId: data?.Warehouse?.id,
        warehouseProductId: data?.Transaction_Items[0]?.productId,
        quantity: data?.Transaction_Items[0].quantity,
        description: 'Transaction cancelled',
        action: 'increment'
      })

      if (res?.status === 200) {
        await handleChangeStatusPayment(5, 'Cancel')
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const fetchImage = async () => {
    const response = await axios.get(
      `${apiurl}/transaction/payment-proof/${data?.id}`
    )
    setPaymentProof(response?.data?.imageURL)
  }

  useEffect(() => {
    fetchImage()
  }, [])

  return (
    <>
      {data?.transactionStatusId !== 0 && (
        <>
          <img className="w-auto h-52 mx-auto" src={paymentProof} />
        </>
      )}
      <table className="w-full">
        <tbody>
          <tr>
            <td className="p-4">
              <label className="block font-medium text-gray-700">
                Username
              </label>
            </td>
            <td className="p-4">
              <label
                htmlFor="username"
                className="block font-medium text-gray-700"
              >
                {data?.User?.username}
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-4">
              <label className="block font-medium text-gray-700">
                Warehouse Name
              </label>
            </td>
            <td className="p-4">
              <label className="block font-medium text-gray-700">
                {data?.Warehouse?.name}
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-4">
              <label className="block font-medium text-gray-700">
                Payment Method
              </label>
            </td>
            <td className="p-4">
              <label className="block font-medium text-gray-700">
                {data?.paymentMethod}
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-4">
              <label className="block font-medium text-gray-700">
                Shipping Address
              </label>
            </td>
            <td className="p-4">
              <label className="block font-medium text-gray-700">
                {data?.shippingAddress}
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-4">
              <label className="block font-medium text-gray-700">
                Payment Status
              </label>
            </td>
            <td className="p-4">
              <label
                htmlFor="payment"
                className={` text-white rounded-xl block font-medium  ${
                  data?.paymentStatus ? 'bg-green-700' : 'bg-red-600'
                }`}
              >
                {data?.paymentStatus ? 'Confirmed' : 'Not confirmed'}
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-4">
              <label className="block font-medium text-gray-700">
                Total Payment
              </label>
            </td>
            <td>Rp.{data?.totalPrice}</td>
          </tr>
        </tbody>
      </table>
      {data?.transactionStatusId === 1 && (
        <div className="flex justify-end gap-4 pt-6">
          <button
            disabled={loading}
            onClick={handleConfirmPayment}
            className={`${
              loading ? 'bg-orange-400' : 'bg-orange-600'
            } text-white rounded-md  p-2 hover:bg-orange-400 active:bg-orange-600`}
          >
            {loading ? '...' : 'Confirm payment'}
          </button>

          <button
            onClick={handleRejectPayment}
            disabled={loading}
            className={`${
              loading ? 'bg-orange-400' : 'bg-orange-600'
            } text-white rounded-md p-2 hover:bg-orange-400 active:bg-orange-600`}
          >
            {loading ? '...' : 'Reject payment'}
          </button>

          <button
            onClick={() => handleChangeStatusPayment(5, 'Cancel')}
            disabled={loading}
            className={`${
              loading ? 'bg-gray-400' : 'bg-gray-600'
            } text-white rounded-md p-2 hover:bg-gray-400 active:bg-gray-600`}
          >
            {loading ? '...' : 'Cancel payment'}
          </button>
        </div>
      )}
      {data?.transactionStatusId === 0 && (
        <div className="flex justify-end gap-4 pt-6">
          <button
            onClick={() => handleChangeStatusPayment(5, 'Cancel')}
            disabled={loading}
            className={`${
              loading ? 'bg-gray-400' : 'bg-gray-600'
            } text-white rounded-md p-2 hover:bg-gray-400 active:bg-gray-600`}
          >
            {loading ? '...' : 'Cancel Order'}
          </button>
        </div>
      )}
      {data?.transactionStatusId === 2 && (
        <div className="flex justify-end gap-4 pt-6">
          <button
            onClick={() => handleChangeStatusPayment(3, 'Confirm')}
            disabled={loading}
            className={`${
              loading ? 'bg-orange-400' : 'bg-orange-600'
            } text-white rounded-md p-2 hover:bg-orange-400 active:bg-orange-600`}
          >
            {loading ? '...' : 'Confirm Shipping'}
          </button>

          <button
            onClick={() => handleUpdateStock()}
            disabled={loading}
            className={`${
              loading ? 'bg-gray-400' : 'bg-gray-600'
            } text-white rounded-md p-2 hover:bg-gray-400 active:bg-gray-600`}
          >
            {loading ? '...' : 'Cancel Shipping'}
          </button>
        </div>
      )}

      <ToastContainer />
    </>
  )
}

export default ConfirmationForm
