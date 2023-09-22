import { PiPencilLineDuotone } from 'react-icons/pi'

export const Address = () => {
  const handleShowEdit = () => {
    // edit ? setEdit(false) : setEdit(true), setChangePassword(false)
  }

  return (
    <div className="bg-white rounded-lg my-2 p-2 text-sm text-left">
      <div className="section-header flex justify-between">
        <p className="font-semibold">Gian (+6285374676)</p>
        <a onClick={handleShowEdit} className="cursor-pointer">
          <PiPencilLineDuotone />
        </a>
      </div>
      <p>Jalan Jalan</p>
      <p>Data Alamat dlll keti ksamaoau</p>
    </div>
  )
}
