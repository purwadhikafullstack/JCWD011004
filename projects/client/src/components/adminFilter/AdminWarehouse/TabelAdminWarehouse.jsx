// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const statusTransaction = [
//   'Menunggu Pembayaran',
//   'Menunggu Konfirmasi Pembayaran',
//   'Diproses',
//   'Dikirim',
//   'Diterima',
//   'Cancel'
// ]
// //eslint-disable-next-line
// const apiUrl = process.env.REACT_APP_API_BASE_URL
// const TabelAdminWarehouse = () => {
//   const headTable = [
//     'No',
//     'Warehouse',
//     'Product',
//     'Buyer',
//     'Quantity',
//     'Status',
//     'Total Price',
//     'Action'
//   ]

//   const [data, setData] = useState([])
//   const [warehouses, setWarehouses] = useState([])
//   const [transactionStatusFilter, setTransactionStatusFilter] = useState(0)
//   const [admin, setAdmin] = useState()
//   //   console.log(admin)
//   const [warehouseFilter, setWarehouseFilter] = useState('all')

//   const fetchWarehouses = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/warehouse/get-all`)
//       setWarehouses(response?.data?.data?.data)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const fetchAdmin = async () => {
//     try {
//       const { data } = await axios.get(`${apiUrl}/admin/info`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       })
//       setAdmin(data)
//       setWarehouseFilter(data?.warehouseAdmin?.id)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const fetchData = async () => {
//     try {
//       let url = `${apiUrl}/admin/all-transaction-admin/2?transactionStatusId=${transactionStatusFilter}`
//       const response = await axios.get(url)
//       console.log(response)
//       setData(response?.data?.allTransaction)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   useEffect(() => {
//     fetchData()
//   }, [warehouseFilter, transactionStatusFilter])

//   useEffect(() => {
//     fetchWarehouses()
//     fetchAdmin()
//   }, [])

//   const renderWarehouseOptions = () => {
//     return (
//       <select
//         value={warehouseFilter}
//         onChange={(e) => setWarehouseFilter(e.target.value)}
//         className="w-full p-2 rounded border border-gray-300"
//       >
//         <option value="all">All Transaction</option>
//         {warehouses?.map((warehouse) => (
//           <option key={warehouse.id} value={warehouse.id}>
//             {warehouse?.name}
//           </option>
//         ))}
//       </select>
//     )
//   }

//   const renderStatusOptions = () => {
//     return (
//       <select
//         value={transactionStatusFilter}
//         onChange={(e) => setTransactionStatusFilter(e.target.value)}
//         className="w-full p-2 rounded border border-gray-300"
//       >
//         {statusTransaction.map((status, index) => (
//           <option key={index} value={index}>
//             {status}
//           </option>
//         ))}
//       </select>
//     )
//   }

//   return (
//     <div className="overflow-x-auto">
//       <div className="mb-4 flex flex-col md:flex-row justify-between">
//         {admin?.userInfo?.roleId == 1 && (
//           <div className="w-full md:w-1/3 mb-4 md:mb-0">
//             <label className="text-lg font-semibold">
//               Filter by Warehouse:
//             </label>
//             {renderWarehouseOptions()}
//           </div>
//         )}
//         <div className="w-full md:w-1/3">
//           <label className="text-lg font-semibold">Filter by Status:</label>
//           {renderStatusOptions()}
//         </div>
//       </div>
//       <div className="md:w-full overflow-x-auto">
//         <table className="w-full bg-white rounded-lg overflow-hidden">
//           <thead>
//             <tr className="bg-blue-500 text-white">
//               {headTable.map((item, index) => (
//                 <th
//                   key={index}
//                   className="px-6 py-3 text-left text-xs font-semibold"
//                 >
//                   {item}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data?.map((item, i) => (
//               <tr
//                 key={item.id}
//                 className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
//               >
//                 <td className="px-6 py-4 text-sm text-gray-900">{i + 1}</td>
//                 <td className="px-6 py-4 text-sm text-gray-900">
//                   {item?.Warehouse.name}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-900">
//                   {item?.Product?.name}
//                   <div className="text-gray-500">
//                     <strong>Detail Transaksi:</strong>
//                     {item.Transaction_Items.map((transactionItem, index) => (
//                       <div key={index}>
//                         {transactionItem?.Product?.name} (
//                         {transactionItem?.quantity})
//                       </div>
//                     ))}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-900">
//                   {item?.User.username}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-900">
//                   {item?.Transaction_Items[0]?.quantity}
//                 </td>
//                 <td className="px-6 py-4 text-sm">
//                   <span
//                     className={`rounded-full px-2 py-1 text-xs ${
//                       item.transactionStatusId === 5
//                         ? 'bg-red-500 text-white'
//                         : 'bg-green-500 text-white'
//                     }`}
//                   >
//                     {statusTransaction[item?.transactionStatusId]}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-900">
//                   {item?.totalPrice}
//                 </td>
//                 <td className="px-6 py-4 text-sm">
//                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default TabelAdminWarehouse
