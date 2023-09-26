import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FaChevronDown } from 'react-icons/fa'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function DropdownProvince() {
  const [sortData, setSortData] = useState([])
  const [selected, setSelected] = useState('City/Regency')
  const provinceId = useSelector((state) => state.dataAddress.provinceId)

  const cityRegency = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/city?province=${provinceId}`
      )
      const city = data.rajaongkir.results
      if (city.length > 0) {
        setSelected(city[0].city_name)
      }
      setSortData(city)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    cityRegency()
  }, [provinceId])

  const handleChange = (index) => {
    setSelected(sortData[index]?.city_name)
  }

  return (
    <div className="w-auto">
      <Listbox value={sortData.indexOf(selected)} onChange={handleChange}>
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                        {dataSort.city_name}
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
