import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { triggerWarehouseProduct } from '../../services/reducer/productReducer'
import { useDispatch, useSelector } from 'react-redux'

function WarehouseProductForm({ dataProduct }) {
  const [warehouseData, setWarehouseData] = useState(
    dataProduct.Warehouse_Products
  )
  const [warehouse, setWarehouse] = useState([])
  const [selectedWarehouse, setSelectedWarehouse] = useState(1)

  const dispatch = useDispatch()
  const isWarehouseProduct = useSelector(
    (state) => state.dataProduct.isWarehouseProduct
  )
  //eslint-disable-next-line
  const apiUrl = process.env.REACT_APP_API_BASE_URL

  const handleDeleteWarehouse = async (productWarehouseid) => {
    try {
      const res = await axios.delete(
        `${apiUrl}/product/warehouse-product/${productWarehouseid}`
      )
      if (res?.status === 200) {
        setWarehouseData((prevData) =>
          prevData.filter((data) => data.id !== productWarehouseid)
        )
        const toastId = toast.success(`Warehouse product deleted`, {
          position: toast.POSITION.BOTTOM_CENTER
        })
        setTimeout(() => {
          toast.dismiss(toastId)
        }, 2000)
      }
    } catch (error) {
      const toastId = toast.error(`Failed to delete`, {
        position: toast.POSITION.BOTTOM_CENTER
      })
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 2000)
    }
    dispatch(triggerWarehouseProduct(!isWarehouseProduct))
  }

  const fetchWarehouse = async () => {
    const { data } = await axios.get(`${apiUrl}/warehouse/get-all`)
    return data.data.data
  }

  const handleAddWarehouse = async (warehouseId, productId) => {
    try {
      const res = await axios.post(`${apiUrl}/product/warehouse-product`, {
        warehouseId,
        productId
      })
      if (res.status === 200) {
        const newWarehouseProduct = res.data.product
        setWarehouseData((prevData) => [...prevData, newWarehouseProduct])
        const toastId = toast.success(`Warehouse product added`, {
          position: toast.POSITION.BOTTOM_CENTER
        })
        setTimeout(() => {
          toast.dismiss(toastId)
        }, 2000)
      }
    } catch (error) {
      const toastId = toast.error(`Failed to add`, {
        position: toast.POSITION.BOTTOM_CENTER
      })
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 2000)
    }
    dispatch(triggerWarehouseProduct(!isWarehouseProduct))
  }

  useEffect(() => {
    const fetchData = async () => {
      const dataWarehouse = await fetchWarehouse()
      const availableWarehouses = dataWarehouse.filter(
        (wh) => !warehouseData.some((data) => data.Warehouse.id === wh.id)
      )
      setWarehouse(availableWarehouses)
      if (availableWarehouses.length > 0) {
        setSelectedWarehouse(availableWarehouses[0].id)
      }
    }
    fetchData()
  }, [dataProduct, warehouseData])

  return (
    <>
      <table className="w-80">
        <tbody>
          {warehouseData.map((data, index) => (
            <tr key={index}>
              <td className="flex items-center justify-between px-4 py-1 border-2 border-white m-1">
                <div className="text-black">{data.Warehouse.name}</div>
                <button
                  onClick={() => handleDeleteWarehouse(data.id)}
                  key={index}
                  className={`btn h-9 w-16 active:bg-gray-700 hover:bg-gray-400 bg-gray-700`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {warehouse.length > 0 ? (
            <div className="flex items-center justify-between pl-2 pr-4 py-1 m-1">
              <select
                id="warehouseSelect"
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
                className="form-select rounded-md shadow-sm p-1"
              >
                {warehouse.map((wh) => (
                  <option key={wh.id} value={wh.id}>
                    {wh.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  handleAddWarehouse(selectedWarehouse, dataProduct.id)
                }
                className={`mt-2 btn h-9 w-16 active:bg-orange-700 hover:bg-orange-400 bg-orange-700`}
              >
                Add
              </button>
            </div>
          ) : (
            ''
          )}
        </tbody>
      </table>
      <ToastContainer />
    </>
  )
}

export default WarehouseProductForm
