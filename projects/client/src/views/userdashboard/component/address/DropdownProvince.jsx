import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FaChevronDown } from 'react-icons/fa'
import axios from 'axios'

const sortData = [
  { sort: 'Sulawesi Selatan' },
  { sort: 'Kalimantan Barat' },
  { sort: 'Jakarta' }
]

export default function DropdownProvince() {
  const [selected, setSelected] = useState(sortData[0])

  const provinces = async () => {
    try {
      const data = await axios.get(
        'https://api.rajaongkir.com/starter/province',
        {
          headers: {
            key: `4c0a32e606022813c8576840c52dd2f6`
          }
        }
      )
      console.log(data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    provinces()
  }, [])

  const handleChange = (index) => {
    setSelected(sortData[index])
  }

  return (
    <div className="w-auto">
      <Listbox value={sortData.indexOf(selected)} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-blue-200 py-1 pl-2 pr-10 text-left shadow-md focus:outline-none focus-visible:border-black-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.sort}</span>
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {sortData.map((dataSort, dataSortIdx) => (
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
                        {dataSort.sort}
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
