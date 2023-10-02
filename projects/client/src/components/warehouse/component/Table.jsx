import React from 'react'

export default function Table(data) {
  const headTable = ['No', 'Name', 'Address', 'Since', 'Action']
  return (
    <>
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="text-center">
            {headTable?.map((item, index) => {
              return (
                <th
                  key={index}
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                >
                  {item}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item, index) => {
            return (
              <tr key={index}>
                {item?.id ? (
                  <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                    {item?.id}
                  </td>
                ) : (
                  ''
                )}
                {item?.name ? (
                  <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                    {item?.name}
                  </td>
                ) : (
                  ''
                )}
                {item?.address ? (
                  <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                    {item?.address}
                  </td>
                ) : (
                  ''
                )}
                {item?.createdAt ? (
                  <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                    {item?.createdAt}
                  </td>
                ) : (
                  ''
                )}
                <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                  <button className="bg-indigo-600 px-3 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                    Edit
                  </button>
                  <button className="bg-red-600 px-3 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
