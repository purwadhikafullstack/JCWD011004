import React, { useEffect, useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const tableHead = ['No', 'Category', 'Action']
// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_BASE_URL

function CategoryTable() {
  const [category, setCategory] = useState([])
  const [isCategoryChange, setIsCategoryChange] = useState(false)
  const [editedCategoryName, setEditedCategoryName] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)

  const handleEditCategory = (index) => {
    setEditingIndex(index)
    setEditedCategoryName(category[index].name)
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
  }

  const handleSaveCategory = async (index) => {
    try {
      const id = category[index].id // Get the ID of the category to update
      const res = await axios.patch(`${apiUrl}/category/${id}`, {
        name: editedCategoryName
      })
      if (res?.status === 200) {
        setIsCategoryChange(!isCategoryChange)
        const toastId = toast.success('Category updated', {
          position: toast.POSITION.BOTTOM_CENTER
        })
        setTimeout(() => {
          toast.dismiss(toastId)
        }, 2000)
        setEditingIndex(null)
      }
    } catch (error) {
      const toastId = toast.error('Failed to update', {
        position: toast.POSITION.BOTTOM_CENTER
      })
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 2000)
    }
  }

  const handleAddCategory = async () => {
    try {
      const res = await axios.post(`${apiUrl}/category`, {
        name: editedCategoryName
      })
      if (res?.status === 200) {
        setIsCategoryChange(!isCategoryChange)
        const toastId = toast.success('Category added', {
          position: toast.POSITION.BOTTOM_CENTER
        })
        setTimeout(() => {
          toast.dismiss(toastId)
        }, 2000)
        setEditedCategoryName('')
      }
    } catch (error) {
      const toastId = toast.error('Failed to add', {
        position: toast.POSITION.BOTTOM_CENTER
      })
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 2000)
    }
  }

  const handleDeleteCategory = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/category/${id}`)
      if (res?.status === 200) {
        const toastId = setIsCategoryChange(!isCategoryChange)
        toast.success('Category deleted', {
          position: toast.POSITION.BOTTOM_CENTER
        })
        setTimeout(() => {
          toast.dismiss(toastId)
        }, 2000)
      }
    } catch (error) {
      const toastId = toast.error('Failed to delete', {
        position: toast.POSITION.BOTTOM_CENTER
      })
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 2000)
    }
  }

  const getCategory = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/product/allCategory`)
      setCategory(data.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getCategory()
  }, [isCategoryChange])

  return (
    <>
      <table className="w-auto">
        <thead className="bg-gray-100 border-b">
          <tr>
            {tableHead.map((item, index) => (
              <th
                scope="col"
                className="text-sm font-medium  text-gray-900 px-6 py-4 text-center"
                key={index}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {category.map((data, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-5">
                {index + 1}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap w-96">
                {editingIndex === index ? (
                  <input
                    className="border-2 rounded-md py-1 px-3 w-64"
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                  />
                ) : (
                  data.name
                )}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-7 justify-center w-64">
                {editingIndex === index ? (
                  <>
                    <button
                      className="btn h-9 w-16 active:bg-orange-700 hover:bg-orange-400 bg-orange-700"
                      onClick={() => handleSaveCategory(index)}
                    >
                      Save
                    </button>
                    <button
                      className="btn h-9 w-16 active:bg-gray-700 hover:bg-gray-400 bg-gray-700"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditCategory(index)}>
                      <BsFillPencilFill />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(data.id)}
                      className="btn h-9 w-20 active:bg-gray-700 hover-bg-gray-400 bg-gray-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr className="bg-white border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <input
                className="border-2 rounded-md py-1 px-3 w-64"
                type="text"
                placeholder="New category"
                onChange={(e) => setEditedCategoryName(e.target.value)}
              />
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5 justify-center">
              <button
                onClick={() => handleAddCategory()}
                className="btn h-9 w-16 active:bg-orange-700 hover:bg-orange-400 bg-orange-700"
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <ToastContainer />
    </>
  )
}

export default CategoryTable
