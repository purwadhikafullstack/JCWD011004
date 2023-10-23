import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FaChevronDown } from 'react-icons/fa'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { provinceData } from '../../../../services/reducer/addressReducer'
// eslint-disable-next-line
const apiUrl = process.env.REACT_APP_API_BASE_URL
export default function DropdownProvince() {
  const [sortData, setSortData] = useState([])
  const [selected, setSelected] = useState('Province')
  const dispatch = useDispatch()

  const provinces = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/external/province`)
      const provinces = data.rajaongkir.results
      setSelected(provinces[0].province)
      setSortData(provinces)
      dispatch(provinceData(provinces[0]))
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    provinces()
  }, [])

  const handleChange = (index) => {
    setSelected(sortData[index]?.province)
    dispatch(provinceData(sortData[index]))
  }

  return (
    <div className="w-auto">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-blue-200 py-1 pl-2 pr-10 text-left shadow-md focus:outline-none focus-visible:border-black-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown
                className="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {sortData?.map((dataSort, dataSortIdx) => (
                <Listbox.Option
                  key={dataSortIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-1 ${
                      active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    }`
                  }
                  value={dataSortIdx}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {dataSort?.province}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
