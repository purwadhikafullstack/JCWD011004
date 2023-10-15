import React, { useEffect, useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import DropDownUserCategory from '../../../../components/dropdown/DropDownUserCategory'
// import SwitchUserStatus from '../../../../components/switch/SwitchUserStatus'
import CreateAdminButton from '../../../../components/button/CreateAdminButton'
import DropDownUserActive from '../../../../components/dropdown/DropDownUserActive'
import axios from 'axios'
import UserPagination from './UserPagination'
import CreateAdminModal from '../../../../components/loginModal/CreateAdminModal'
import UpdateAdminModal from '../../../../components/loginModal/UpdateAdminModal'

const tableHead = [
  'No',
  'Username',
  'Fullname',
  'Email',
  'Google',
  'Phone Number',
  'Role',
  'Status',
  'WareHouse',
  'Action'
]

const role = ['Super Admin', 'Admin', 'User']
// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_BASE_URL

function UserTable() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [sortActiveUser, setSortActiveUser] = useState(1)
  const [sortRoleUser, setsortRoleUser] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [updateData, setUpdateData] = useState({})
  const itemsPerPage = 10

  const handleActiveSortChange = (newSort) => {
    setSortActiveUser(newSort)
  }

  const handleSortUserChange = (newSort) => {
    setsortRoleUser(newSort)
  }

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }
  function handleOpenUpdateModal(data) {
    setUpdateData(data)
    setIsModalUpdateOpen(true)
  }

  function handleClosUpdateModal() {
    setIsModalUpdateOpen(false)
  }

  const token = localStorage.getItem('token')
  const fetchData = async (pages) => {
    try {
      const response = await axios.get(
        `${apiUrl}/admin/user?page=${pages}&size=10${
          sortRoleUser ? '&roleId=' : ''
        }&roleId=${sortRoleUser}&isActive=${sortActiveUser}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setData(response?.data?.users)
      setTotalPages(response?.data?.totalPages)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [sortActiveUser, sortRoleUser, isModalOpen, isModalUpdateOpen])
  return (
    <>
      <div className="w-full flex gap-10 justify-end">
        <DropDownUserActive sort={handleActiveSortChange} />
        <DropDownUserCategory sort={handleSortUserChange} />
        <CreateAdminButton onClick={handleOpenModal} />
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    {tableHead &&
                      tableHead.map((item, index) => (
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
                  {data &&
                    data?.map((e, i) => {
                      let currentIndex =
                        (currentPage - 1) * itemsPerPage + i + 1
                      return (
                        <tr key={currentIndex} className="bg-gray-100 border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {currentIndex}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {e?.username}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {e?.firstName}&nbsp;{e?.lastName}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {e?.email}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {e?.google ? 'Verified' : 'No'}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {e?.phoneNumber}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {role[e?.roleId - 1]}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {e?.isActive ? 'Active' : 'Inactive'}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {e?.Warehouse_Admins[0]
                              ? e?.Warehouse_Admins[0]?.Warehouse?.name
                              : 'Null'}
                          </td>
                          {e?.roleId === 1 ? (
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5 justify-center"></td>
                          ) : (
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5 justify-center">
                              <button
                                onClick={() => {
                                  handleOpenUpdateModal(e)
                                }}
                              >
                                <BsFillPencilFill />
                              </button>
                            </td>
                          )}
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <UpdateAdminModal
        isOpen={isModalUpdateOpen}
        onClose={handleClosUpdateModal}
        data={updateData}
      />
      <CreateAdminModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <UserPagination
        totalPages={totalPages}
        fetchData={fetchData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default UserTable
