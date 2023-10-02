import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Komponen modal untuk membuat gudang
function CreateWarehouseModal() {
  const [isOpen, setIsOpen] = useState(false) // State untuk mengontrol visibilitas modal
  const [provinces, setProvinces] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [subdistrict, setSubdistrict] = useState('') // State untuk kecamatan
  const [warehouseName, setWarehouseName] = useState('') // State untuk nama Warehouse
  const [streetAddress, setStreetAddress] = useState('') // State untuk jalan
  const [postalCode, setPostalCode] = useState('') // State untuk kode pos
  const [isLoading, setIsLoading] = useState(false) // State untuk status loading
  const [isCreating, setIsCreating] = useState(false) // State untuk status "Buat"

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setSelectedProvince('')
    setSelectedCity('')
    setSubdistrict('')
    setWarehouseName('')
    setStreetAddress('')
    setPostalCode('')
    setIsOpen(false) // Tutup modal dengan mengubah state isOpen menjadi false
  }

  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsOpen(true) // Buka modal dengan mengubah state isOpen menjadi true
  }

  // Fungsi untuk mengirimkan data gudang (dummy data untuk simulasi)
  const createWarehouse = () => {
    // Validasi jika semua field terisi
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

    // Set status "Buat" menjadi true saat tombol ditekan
    setIsCreating(true)

    // Simulasi proses pengiriman data gudang
    setIsLoading(true) // Set loading menjadi true saat proses berjalan

    setTimeout(() => {
      // Simulasi sukses membuat gudang
      setIsLoading(false) // Set loading menjadi false setelah berhasil
      setIsCreating(false) // Set status "Buat" menjadi false

      // Reset form
      setSelectedProvince('')
      setSelectedCity('')
      setSubdistrict('')
      setWarehouseName('')
      setStreetAddress('')
      setPostalCode('')

      // Tutup modal
      closeModal()

      // Tampilkan pesan toast sukses
      toast.success('Gudang berhasil dibuat!', {
        position: toast.POSITION.TOP_CENTER
      })
    }, 2000) // Simulasi waktu proses
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
        className="modal w-[400px] h-[300px] bg-white p-4 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        overlayClassName="overlay" // Gaya overlay dengan Tailwind CSS
      >
        <div className="bg-white p-4 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-2xl font-semibold mb-4">Create Warehouse</h2>
          <label className="block mb-2">
            Nama Warehouse:
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              value={warehouseName}
              onChange={(e) => setWarehouseName(e.target.value)}
            />
          </label>
          <br />
          <label className="block mb-2">
            Jalan:
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </label>
          <br />
          <label className="block mb-2">
            Kode Pos:
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </label>
          <br />
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
          <label className="block mb-2">
            Kecamatan:
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              value={subdistrict}
              onChange={(e) => setSubdistrict(e.target.value)}
            />
          </label>
          <br />
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={closeModal}
              disabled={isLoading} // Tombol hanya aktif jika tidak dalam status loading
            >
              Tutup
            </button>
            <button
              className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
                isLoading || isCreating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={isLoading || isCreating ? null : createWarehouse} // Tombol hanya aktif jika tidak dalam status loading atau status "Buat"
            >
              {isLoading ? 'Membuat...' : isCreating ? 'Membuat' : 'Buat'}
            </button>
          </div>
          <br />
          {isLoading && <p>Sedang memproses...</p>}
        </div>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default CreateWarehouseModal
