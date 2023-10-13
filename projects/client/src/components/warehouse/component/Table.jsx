import React from 'react'
import { Link } from 'react-router-dom'
import DeleteModal from './ModalDelete'
import { useState } from 'react'

const Table = ({ data }) => {
  const headTable = [
    'No',
    'Name',
    'Address',
    'Since',
    'City',
    'Province',
    'Action'
  ]
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState(null)

  const openDeleteModal = (id) => {
    setSelectedItemId(id)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setSelectedItemId(null)
    setIsDeleteModalOpen(false)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="text-center">
            {headTable.map((item, index) => (
              <th
                key={index}
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                {item.id}
              </td>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                {item.name}
              </td>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                {item.address}
              </td>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                {item.createdAt}
              </td>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                {item.cityRegency}
              </td>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                {item.province}
              </td>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                <Link to={`/edit-warehouse/${item.id}`}>
                  <button className="bg-indigo-600 px-3 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                    Edit
                  </button>
                </Link>
                <button
                  className="bg-red-600 px-3 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer ml-2"
                  onClick={() => openDeleteModal(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteModal
        id={selectedItemId}
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      />
    </div>
  )
}

export default Table
