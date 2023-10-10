import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

function EditWarehousePage() {
  const [province, setProvince] = useState([])
  const [cities, setCities] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [subdistrict, setSubdistrict] = useState('')
  const [warehouseName, setWarehouseName] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const provinceName = province[selectedProvince - 1]
  const { id } = useParams()

  const fetchProvinces = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8000/api/external/province'
      )
      const provinces = data.rajaongkir.results
      setProvince(provinces)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchCities = async () => {
    try {
      if (selectedProvince) {
        const response = await axios.get(
          `http://localhost:8000/api/external/city?province=${selectedProvince}`
        )
        const cities = response.data.rajaongkir.results
        setCities(cities)
      } else {
        setCities([])
      }
    } catch (error) {
      console.error('Error fetching cities:', error)
    }
  }

  const closeModal = () => {
    setSelectedProvince('')
    setSelectedCity('')
    setSubdistrict('')
    setWarehouseName('')
    setStreetAddress('')
    setPostalCode('')
  }

  const updateWarehouse = async () => {
    if (
      !warehouseName ||
      !streetAddress ||
      !selectedProvince ||
      !selectedCity ||
      !subdistrict ||
      !postalCode
    ) {
      toast.error('Harap isi semua field.', {
        position: toast.POSITION.TOP_CENTER
      })
      return
    }
    setIsUpdating(true)
    const warehouseData = {
      name: warehouseName,
      address: streetAddress,
      province: provinceName.province,
      cityRegency: selectedCity,
      postalcode: postalCode
    }
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/warehouse/update/${id}`,
        warehouseData
      )
      console.log('Response from API:', response.data)
      setIsLoading(false)
      setIsUpdating(false)
      setSelectedProvince('')
      setSelectedCity('')
      setSubdistrict('')
      setWarehouseName('')
      setStreetAddress('')
      setPostalCode('')
      closeModal()
      toast.success('Gudang berhasil diperbarui!', {
        position: toast.POSITION.TOP_CENTER
      })
      setTimeout(() => {
        window.location.href = '/admin/warehouse'
      }, 1000)
    } catch (error) {
      console.error('Error updating warehouse:', error)
    }
  }

  useEffect(() => {
    fetchProvinces()
    fetchCities()
  }, [selectedProvince])

  return (
    <div className="text-left p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Warehouse</h2>
      <div className="mb-4">
        <label htmlFor="warehouseName" className="block mb-2 text-gray-600">
          Nama Warehouse:
          <input
            type="text"
            id="warehouseName"
            className="border rounded-md p-2 w-full"
            value={warehouseName}
            onChange={(e) => setWarehouseName(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="streetAddress" className="block mb-2 text-gray-600">
          Jalan:
          <input
            type="text"
            id="streetAddress"
            className="border rounded-md p-2 w-full"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="postalCode" className="block mb-2 text-gray-600">
          Kode Pos:
          <input
            type="text"
            id="postalCode"
            className="border rounded-md p-2 w-full"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="selectedProvince" className="block mb-2 text-gray-600">
          Provinsi:
          <select
            id="selectedProvince"
            className="border rounded-md p-2 w-full"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="">Pilih Provinsi</option>
            {province.map((province, index) => (
              <option key={index} value={province.province_id}>
                {province.province}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="selectedCity" className="block mb-2 text-gray-600">
          Kabupaten:
          <select
            id="selectedCity"
            className="border rounded-md p-2 w-full"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Pilih Kabupaten</option>
            {cities.map((city, index) => (
              <option key={index} value={city?.city_name}>
                {city.city_name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="subdistrict" className="block mb-2 text-gray-600">
          Kecamatan:
          <input
            type="text"
            id="subdistrict"
            className="border rounded-md p-2 w-full"
            value={subdistrict}
            onChange={(e) => setSubdistrict(e.target.value)}
          />
        </label>
      </div>
      <div className="flex justify-between">
        <Link to={'/admin/warehouse'} className="text-blue-500 hover:underline">
          Kembali
        </Link>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
            isLoading || isUpdating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={isLoading || isUpdating ? null : updateWarehouse}
        >
          {isLoading
            ? 'Memperbarui...'
            : isUpdating
            ? 'Memperbarui'
            : 'Perbarui'}
        </button>
      </div>
      {isLoading && <p className="text-center mt-4">Sedang memproses...</p>}
      <ToastContainer />
    </div>
  )
}

export default EditWarehousePage
