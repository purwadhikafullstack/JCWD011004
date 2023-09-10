import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FaCheck, FaChevronDown } from 'react-icons/fa'

const sortData = [
  { sort: 'ALL PRODUCT' },
  { sort: 'CHAIRS' },
  { sort: 'SOFAS' },
  { sort: 'TABLE' },
  { sort: 'WARDROBE' },
  { sort: 'BED' }
]

export default function Dropdown() {
  const [selected, setSelected] = useState(sortData[0])

  const handleChange = (index) => {
    setSelected(sortData[index])
  }

  return (
    <div className="w-44 font-bold hover:text-orange-400 transition duration-300 ease-in-out">
      <Listbox value={sortData.indexOf(selected)} onChange={handleChange}>
        <div className="relative m-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-orange-200 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-black-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.sort}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown
                className="h-5 w-5 text-orange-400"
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
              {sortData.map((dataCategory, dataCategoryIdx) => (
                <Listbox.Option
                  key={dataCategoryIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={dataCategoryIdx}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {dataCategory.sort}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <FaCheck className="h-3 w-3" aria-hidden="true" />
                        </span>
                      ) : null}
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
