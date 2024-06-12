import React, { Dispatch, SetStateAction } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { EditProject } from './EditProject'
import { useProject } from '@/app/store'
import { ProjectObject } from '@/app/interfaces'
import { deleteProject } from './actions'
import DetailsProject from './DetailsProject'
import { useRouter } from 'next/navigation'
import { showToast } from '@/app/helpers/showToast'

type MenuProjectsProps = {
    prod: ProjectObject,
    setLoading: Dispatch<SetStateAction<boolean>>
}

export default function MenuProjects({ prod, setLoading }: MenuProjectsProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isOpenModalDetails, SetIsOpenModalDetails] = React.useState(false)
    const setProject = useProject((state) => state.setProject)
    const router = useRouter()

    function closeModal() { setIsOpen(false) } 
    function openModal() { setIsOpen(true) }

    function closeModalDetails() { SetIsOpenModalDetails(false) } 
    function openModalDetails() { SetIsOpenModalDetails(true) }

    const handleDelete = async () => {
        setLoading(true)
        try {
            const data = await deleteProject(prod._id)
            showToast("success", data);
            if (data.error) {
                showToast("error", data.error);
                return
            }
        } catch (error) {
            router.push('/error')
        }
    }
    
  return (
    <div className="flex shrink-0 items-center gap-x-6">

        <EditProject closeModal={closeModal} isOpen={isOpen} setLoading={setLoading}/>
        <DetailsProject closeModalDetails={closeModalDetails} isOpenModalDetails={isOpenModalDetails}/>

        <Menu as="div" className="relative flex-none">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">opciones</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-admintask">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
            </Menu.Button>
            <Transition as={Fragment} enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items
                    className="absolute right-2 z-10 mt-2 w-56 origin-top-right rounded-md bg-slate-900 border-gray-800 border shadow-md shadow-black ring-1 ring-gray-900/5 focus:outline-none"
                >
                        <Menu.Item>
                            <button onClick={() => {openModalDetails(); setProject(prod)}}
                                className='block px-3 py-2 text-sm leading-6 text-gray-400 hover:text-gray-300 hover:bg-slate-800 transition-all w-full text-left'>
                            Ver Proyecto
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button 
                                onClick={() => {openModal(); setProject(prod)}}
                                className='block px-3 py-2 text-sm leading-6 text-gray-400 hover:text-gray-300 hover:bg-slate-800 transition-all w-full text-left'>
                            Editar Proyecto
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button 
                                type='button' 
                                className='block px-3 py-2 text-sm leading-6 text-red-500 hover:text-red-400 hover:bg-slate-800 transition-all w-full text-left'
                                onClick={() => handleDelete() }
                            >
                                Eliminar Proyecto
                            </button>
                        </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
        
    </div>
  )
}
