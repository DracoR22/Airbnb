'use client'

import useCountries from '@/app/hooks/useCountries'
import useSearchModal from '@/app/hooks/useSearchModal'
import { useSearchParams } from 'next/navigation'
import { BiSearch } from 'react-icons/bi'
import { useMemo } from 'react'
import { differenceInDays } from 'date-fns'

const SearchBar = () => {

const searchModal = useSearchModal()
const params = useSearchParams()
const { getByValue } = useCountries()

const locationValue = params?.get('locationValue')
const startDate = params?.get('startDate')
const endDate = params?.get('endDate')
const guestCount = params?.get('guestCount')

const locationLabel = useMemo(() => {
  if(locationValue) {
    return getByValue(locationValue as string)?.label 
   }

   return 'Anywhere'
}, [getByValue, locationValue])

const durationLabel = useMemo(() => {
  if(startDate && endDate) {
     const start = new Date(startDate as string)
     const end = new Date(endDate as string)
     let diff = differenceInDays(end, start)

     if(diff === 0) {
      diff = 1
     }

     return `${diff} Days`
  }

  return 'Any Week'
}, [startDate, endDate])

const guestsLabel = useMemo(() => {
  if(guestCount) {
    return `${guestCount} Guests`
  }

  return 'Add Guests'
}, [guestCount])

  return (
    <div className="border-[1.5px] w-full md:w-auto py-1.5 rounded-full shadow-sm
     hover:shadow-md transition cursor-pointer" onClick={searchModal.onOpen}>
       <div className="flex flex-row items-center justify-between">
         <div className="text-[14px] font-semibold px-4">
           {locationLabel}
         </div>
         <div className="hidden sm:block text-[14px] font-semibold px-4 border-x-[1px] flex-1 text-center">
           {durationLabel}
         </div>
         <div className="text-[14px] pl-4 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">
            {guestsLabel}
          </div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18}/>
          </div>
         </div>
       </div>
    </div>
  )
}

export default SearchBar