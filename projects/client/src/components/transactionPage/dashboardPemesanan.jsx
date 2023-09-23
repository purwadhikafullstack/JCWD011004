// src/components/DashboardPemesanan.js

import React, { useState } from 'react'

const orders = [
  { id: 1, status: 'Diproses' },
  { id: 2, status: 'Dikirim' },
  { id: 3, status: 'Diterima' },
  { id: 4, status: 'Dibatalkan' }
]

const DashboardPemesanan = () => {
  const [selectedStatus, setSelectedStatus] = useState('Semua')

  const filterOrdersByStatus = () => {
    if (selectedStatus === 'Semua') {
      return orders
    } else {
      return orders.filter((order) => order.status === selectedStatus)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Pemesanan</h1>
      <div className="flex mb-4">
        <label htmlFor="status" className="mr-2">
          Filter status:
        </label>
        <select
          id="status"
          className="p-2 border rounded"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="Semua">Semua</option>
          <option value="Diproses">Diproses</option>
          <option value="Dikirim">Dikirim</option>
          <option value="Diterima">Diterima</option>
          <option value="Dibatalkan">Dibatalkan</option>
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">ID</th>
            <th className="p-2 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {filterOrdersByStatus().map((order) => (
            <tr key={order.id}>
              <td className="p-2 border border-gray-300">{order.id}</td>
              <td className="p-2 border border-gray-300">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardPemesanan
