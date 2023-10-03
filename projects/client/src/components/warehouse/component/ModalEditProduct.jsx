import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Komponen modal untuk mengedit gudang
function EditWarehouseModal({ isOpen, onClose, warehouseData }) {
  const [editedWarehouse, setEditedWarehouse] = useState(warehouseData)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setEditedWarehouse(warehouseData)
  }, [warehouseData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedWarehouse((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleEditWarehouse = () => {
    // Validasi jika semua field terisi
    if (
      !editedWarehouse.warehouseName ||
      !editedWarehouse.streetAddress ||
      !editedWarehouse.selectedProvince ||
      !editedWarehouse.selectedCity ||
      !editedWarehouse.subdistrict ||
      !editedWarehouse.postalCode
    ) {
      toast.error('Harap isi semua field.', {
        position: toast.POSITION.TOP_CENTER
      })
      return
    }

    setIsLoading(true)

    // Simulasi proses pengiriman data gudang
    setTimeout(() => {
      setIsLoading(false)

      // Tutup modal
      onClose()

      // Tampilkan pesan toast sukses
      toast.success('Gudang berhasil diubah!', {
        position: toast.POSITION.TOP_CENTER
      })
    }, 2000) // Simulasi waktu proses
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Warehouse Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Warehouse</h2>
        <label className="block mb-2">
          Nama Warehouse:
          <input
            type="text"
            className="border rounded-md p-2 w-full"
            name="warehouseName"
            value={editedWarehouse.warehouseName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className="block mb-2">
          Jalan:
          <input
            type="text"
            className="border rounded-md p-2 w-full"
            name="streetAddress"
            value={editedWarehouse.streetAddress}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className="block mb-2">
          Kode Pos:
          <input
            type="text"
            className="border rounded-md p-2 w-full"
            name="postalCode"
            value={editedWarehouse.postalCode}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className="block mb-2">
          Provinsi:
          <select
            className="border rounded-md p-2 w-full"
            name="selectedProvince"
            value={editedWarehouse.selectedProvince}
            onChange={handleInputChange}
          >
            <option value="">Pilih Provinsi</option>
            {/* Render the list of provinces */}
          </select>
        </label>
        <br />
        <label className="block mb-2">
          Kabupaten:
          <select
            className="border rounded-md p-2 w-full"
            name="selectedCity"
            value={editedWarehouse.selectedCity}
            onChange={handleInputChange}
          >
            <option value="">Pilih Kabupaten</option>
            {/* Render the list of cities */}
          </select>
        </label>
        <br />
        <label className="block mb-2">
          Kecamatan:
          <input
            type="text"
            className="border rounded-md p-2 w-full"
            name="subdistrict"
            value={editedWarehouse.subdistrict}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={onClose}
            disabled={isLoading}
          >
            Tutup
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={isLoading ? null : handleEditWarehouse}
          >
            {isLoading ? 'Mengedit...' : 'Edit'}
          </button>
        </div>
        <br />
        {isLoading && <p>Sedang memproses...</p>}
      </div>
      <ToastContainer />
    </Modal>
  )
}

export default EditWarehouseModal
