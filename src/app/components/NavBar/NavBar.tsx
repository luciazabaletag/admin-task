"use client"
import React from "react"
import Image from "next/image"
import { useReloadImage, useSidebar, useUser } from "@/app/store"
import UserImage from "@/app/assets/users/profile.png"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { getUser } from "./actions"
import Spinner from "../Spinner/Spinner"

export default function NavBar() {
  const [ imageProfile, setImageProfile] = React.useState('')
  const [ loading, setLoading] = React.useState(true);
  
  const router = useRouter()
  const { data: session} = useSession()

  const setSidebar = useSidebar((state) => state.setSidebar)
  const setUser = useUser((state) => state.setUser)
  const user = useUser((state) => state.user)
  const reloadI = useReloadImage( (state) => state.reloadI)
  const setReloadI = useReloadImage( (state) => state.setReloadI)

  React.useEffect( () => {
    const getUsers = async () => {
      try {
        const idUser = session?.user?.userId
        const data = await getUser(idUser!)
        setUser(data)
        if (data) setImageProfile(Buffer.from(data.file).toString('base64'));
        setLoading(false)
        setReloadI(true)
        
      } catch (error) {
        router.push('/error')
      }
    }
    getUsers()
}, [reloadI])

  return (
    <div className='w-full py-4 px-3 flex md:sticky bg-slate-950 z-30 top-0 justify-between md:justify-end items-center gap-1 border-0 md:border-b border-gray-900'>
        <button className="block md:hidden" onClick={() => setSidebar(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-admintask">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          { loading ? <Spinner /> : (
            <>
              <p className="text-gray-100 text-md font-medium first-letter:uppercase">{user?.firstName}</p>
              {imageProfile?.length ? (
                  <Image width={50} height={50} className='rounded-full w-10 h-10 object-cover' src={`data:image/webp;charset=utf-8;base64,${imageProfile}`} alt='imagen usuario'/>
              ) : (
                  <Image className='rounded-full w-10 h-10 object-cover' src={UserImage} alt='imagen usuario'/>
              )}
            </>
          )}
        </div>
    </div>
  )
}
