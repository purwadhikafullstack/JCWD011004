import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

function CreateWarehousePage() {
  const [province, setProvince] = useState([])
  const [cities, setCities] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [subdistrict, setSubdistrict] = useState('')
  const [warehouseName, setWarehouseName] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const provinceName = province[selectedProvince - 1]

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/external/province'
      )
      const provinces = response.data.rajaongkir.results
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
        console.log(response.data.rajaongkir.results)
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

  const createWarehouse = async () => {
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
    setIsCreating(true)
    const warehouseData = {
      name: warehouseName,
      address: streetAddress,
      province: provinceName.province,
      cityRegency: selectedCity,
      postalcode: postalCode
    }
    try {
      const response = await axios.post(
        'http://localhost:8000/api/warehouse/create',
        warehouseData
      )
      console.log('Response from API:', response.data)
      setIsLoading(false)
      setIsCreating(false)
      setSelectedProvince('')
      setSelectedCity('')
      setSubdistrict('')
      setWarehouseName('')
      setStreetAddress('')
      setPostalCode('')
      closeModal()
      toast.success('Gudang berhasil dibuat!', {
        position: toast.POSITION.TOP_CENTER
      })

      setTimeout(() => {
        window.location.href = '/admin/warehouse'
      }, 2000)
    } catch (error) {
      console.error('Error creating warehouse:', error)
    }
  }

  useEffect(() => {
    fetchProvinces()
    fetchCities()
  }, [selectedProvince])

  return (
    <div className="container mx-auto max-w-screen-lg p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Create Warehouse</h2>
      <div className="mb-4 text-left">
        <label htmlFor="warehouseName" className="block text-gray-600">
          Nama Warehouse:
          <input
            type="text"
            id="warehouseName"
            className="border rounded-md p-2 w-full mt-1"
            value={warehouseName}
            onChange={(e) => setWarehouseName(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4 text-left">
        <label htmlFor="streetAddress" className="block text-gray-600">
          Jalan:
          <input
            type="text"
            id="streetAddress"
            className="border rounded-md p-2 w-full mt-1"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4 text-left">
        <label htmlFor="postalCode" className="block text-gray-600">
          Kode Pos:
          <input
            type="text"
            id="postalCode"
            className="border rounded-md p-2 w-full mt-1"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4 text-left">
        <label htmlFor="selectedProvince" className="block text-gray-600">
          Provinsi:
          <select
            id="selectedProvince"
            className="border rounded-md p-2 w-full mt-1"
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
      <div className="mb-4 text-left">
        <label htmlFor="selectedCity" className="block text-gray-600">
          Kabupaten:
          <select
            id="selectedCity"
            className="border rounded-md p-2 w-full mt-1"
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
      <div className="mb-4 text-left">
        <label htmlFor="subdistrict" className="block text-gray-600">
          Kecamatan:
          <input
            type="text"
            id="subdistrict"
            className="border rounded-md p-2 w-full mt-1"
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
            isLoading || isCreating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={isLoading || isCreating ? null : createWarehouse}
        >
          {isLoading ? 'Membuat...' : isCreating ? 'Membuat' : 'Buat'}
        </button>
      </div>
      {isLoading && <p className="text-center mt-4">Sedang memproses...</p>}
      <ToastContainer />
    </div>
  )
}

export default CreateWarehousePage
