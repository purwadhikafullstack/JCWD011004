import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

// Komponen modal untuk membuat gudang
function CreateWarehouseModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [provinces] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [cities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [subdistrict, setSubdistrict] = useState('')
  const [warehouseName, setWarehouseName] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const closeModal = () => {
    setSelectedProvince('')
    setSelectedCity('')
    setSubdistrict('')
    setWarehouseName('')
    setStreetAddress('')
    setPostalCode('')
    setIsOpen(false)
  }
  const openModal = () => {
    setIsOpen(true)
  }
  const fetchDataFromApi = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/warehouse/create'
      )
      const data = response.data
      setWarehouseName(data.name)
      setStreetAddress(data.address)
      setSelectedProvince(data.province)
      setSelectedCity(data.cityRegency)
      setPostalCode(data.postalcode)
    } catch (error) {
      console.error('Error fetching data from API:', error)
    }
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
      province: selectedProvince,
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
    } catch (error) {
      console.error('Error creating warehouse:', error)
      // Handle error and display a message to the user if necessary
    }
  }
  useEffect(() => {
    if (isOpen) {
      fetchDataFromApi()
    }
  }, [isOpen])
  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={openModal}
      >
        Buka Modal
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Create Warehouse Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2 className="text-2xl font-semibold mb-4">Create Warehouse</h2>
          <label className="block mb-4">
            Nama Warehouse:
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              value={warehouseName}
              onChange={(e) => setWarehouseName(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            Jalan:
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            Kode Pos:
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            Provinsi:
            <select
              className="border rounded-md p-2 w-full"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="">Pilih Provinsi</option>
              {provinces.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-4">
            Kabupaten:
            <select
              className="border rounded-md p-2 w-full"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Pilih Kabupaten</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-4">
            Kecamatan:
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              value={subdistrict}
              onChange={(e) => setSubdistrict(e.target.value)}
            />
          </label>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={closeModal}
              disabled={isLoading}
            >
              Tutup
            </button>
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
        </div>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default CreateWarehouseModal
