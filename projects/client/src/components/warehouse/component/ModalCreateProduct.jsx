import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'

// Komponen modal untuk membuat gudang
function CreateWarehouseModal() {
  const [isOpen, setIsOpen] = useState(false) // State untuk mengontrol visibilitas modal
  const [provinces, setProvinces] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setSelectedProvince('')
    setSelectedCity('')
    setIsOpen(false) // Tutup modal dengan mengubah state isOpen menjadi false
  }

  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsOpen(true) // Buka modal dengan mengubah state isOpen menjadi true
  }

  // Fungsi untuk mengambil data provinsi (dummy data)
  useEffect(() => {
    // Gantilah dengan permintaan API nyata ke server Anda di sini
    const dummyProvinces = ['Provinsi 1', 'Provinsi 2', 'Provinsi 3']
    setProvinces(dummyProvinces)
  }, [])

  // Fungsi untuk mengambil data kabupaten berdasarkan provinsi yang dipilih (dummy data)
  useEffect(() => {
    // Gantilah dengan permintaan API nyata ke server Anda di sini
    const dummyCities = ['Kota 1', 'Kota 2', 'Kota 3']
    setCities(dummyCities)
  }, [selectedProvince])

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={openModal} // Membuka modal saat tombol ditekan
      >
        Buka Modal
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Create Warehouse Modal"
        className="modal"
        overlayClassName="overlay" // Gaya overlay dengan Tailwind CSS
      >
        <div className="bg-white p-4 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-2xl font-semibold mb-4">Create Warehouse</h2>
          <label className="block mb-2">
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
          <br />
          <label className="block mb-2">
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
          <br />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={closeModal}
          >
            Tutup
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default CreateWarehouseModal
