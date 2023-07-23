'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { RiGlobalLine } from 'react-icons/ri'
import Avatar from '../Avatar'
import { useCallback, useEffect, useRef, useState } from 'react'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import useRentModal from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {

 const [isOpen, setIsOpen] = useState(false)
 const registerModal = useRegisterModal()
 const loginModal = useLoginModal()
 const rentModal = useRentModal()
 const router = useRouter()

 const menuRef = useRef<HTMLDivElement>(null)

 const toggleOpen = useCallback(() => {
  setIsOpen((value) => !value)
 }, [])

 //Close menu when click outside
 const closeMenu = useCallback(() => {
  setIsOpen(false)
}, [])

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu()
    }
  }

  document.addEventListener('click', handleClickOutside)
  return () => {
    document.removeEventListener('click', handleClickOutside)
  }
}, [closeMenu])

//Rent Modal
const onRent = useCallback(() => {
  if(!currentUser) {
   return loginModal.onOpen()
  }

  rentModal.onOpen()
}, [currentUser, loginModal, rentModal])

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
       <div onClick={onRent} className="hidden md:block text-[15px] font-semibold py-2
        rounded-full hover:bg-neutral-100 transition cursor-pointer px-2">
          Airbnb my home
       </div>
       <div className='mr-2'>
        <RiGlobalLine size={20}/>
       </div>
       <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1.5px] border-neutral-200
       flex flex-row items-center gap-3 rounded-full  cursor-pointer hover:shadow-md transition">
         <AiOutlineMenu/>
         <div className='hidden md:block'>
         <Avatar src={currentUser?.image}/>
       </div>
       </div>
      </div>

      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vh] md:w-3/4 bg-white overflow-hidden
        right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
              <MenuItem onClick={() => router.push('/trips')} label='My trips'/>
              <MenuItem onClick={() => router.push('/favorites')} label='My favorites'/>
              <MenuItem onClick={() => router.push('/reservations')} label='My reservations'/>
              <MenuItem onClick={() => router.push('/properties')} label='My properties'/>
              <hr />
              <MenuItem onClick={rentModal.onOpen} label='Airbnb my home'/>
              <MenuItem onClick={() => signOut()} label='Logout'/>
            </>
            ) : (
              <>
              <MenuItem onClick={loginModal.onOpen} label='Login'/>
              <MenuItem onClick={registerModal.onOpen} label='Sign up'/>
              <hr />
              <MenuItem onClick={loginModal.onOpen} label='Airbnb my home'/>
            </>
            )}
            
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu