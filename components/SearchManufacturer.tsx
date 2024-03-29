"use client"

import { Combobox, Transition } from '@headlessui/react'
import { SearchManufacturerProps } from '@/types'
import Image from 'next/image'
import { useState, Fragment } from 'react'
import { manufacturers } from '@/constant'

const SearchManufacturer = ({ manufacturer,
    setManufacturer }: SearchManufacturerProps) => {
    const [query, SetQuery] = useState("");
    const filteredManufactures = query === "" ?
        manufacturers : manufacturers.filter((item) => (

            item.toLocaleLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
        ))
    return (
        <div className='search-manufacturer'>
            <Combobox value ={manufacturer} onChange={setManufacturer}>
                <div className='relative w-full'>
                    <Combobox.Button className="absoulte top-[14px]">
                        <Image src="/car-logo.svg"
                            width={20}
                            height={20}
                            className="ml-4"
                            alt="Car Logo"
                        />
                    </Combobox.Button>
                    <Combobox.Input
                        className="search-manufacturer-input"
                        placeholder="Volkswagen"
                        displayValue={(manufacturer: string) => manufacturer}
                        onChange={(e) => SetQuery(e.target.value)}
                    />
                    <Transition as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        afterLeave={() => SetQuery("")}
                    >
                        <Combobox.Options>


                            {
                                filteredManufactures.map((item) =>
                                    <Combobox.Option
                                        key={item}

                                        className={({ active }) => `relative search-manufacturer__option
                                ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                                        value={item}>
                                       {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            
                          </span>
                        ) : null}
                      </>
                                        )}
                                    </Combobox.Option>

                                )}

                        </Combobox.Options>
                    </Transition>


                </div>
            </Combobox>
        </div>
    )
}

export default SearchManufacturer
