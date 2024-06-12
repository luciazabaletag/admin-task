import { CreateProject } from "./CreateProject"
import React, { Dispatch, SetStateAction } from "react"

type NavBarProjectsProps = {
  setLoading: Dispatch<SetStateAction<boolean>>
}
export default function NavBarProjects({setLoading}: NavBarProjectsProps) {

    const [isOpen, setIsOpen] = React.useState(false)

    function closeModal() { setIsOpen(false) }
    function openModal() { setIsOpen(true) }

    const handleRefresh = () => {
      setLoading(true)
    }

  return (
    <div className='flex justify-end gap-3 w-full mb-5'>
        <CreateProject closeModal={closeModal} isOpen={isOpen} setLoading={setLoading}/>
        <button type='button' className='text-admintask relative group' onClick={handleRefresh}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span
            className="pointer-events-none absolute bg-gray-900 text-gray-300 py-1 px-2 rounded-md -top-10 -left-10 w-max opacity-0 transition-opacity group-hover:opacity-100"
            >
            Actualizar
            </span>
        </button>
        <button type='button' className='text-admintask  relative group' onClick={openModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span
            className="pointer-events-none absolute bg-gray-900 text-gray-300 py-1 px-2 rounded-md -top-10 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100"
            >
            Crear Proyecto
            </span>
        </button>
    </div>
  )
}