import { TaskObject } from '@/app/interfaces';
import { useTask } from '@/app/store';
import { Menu, Transition } from '@headlessui/react';
import React, { Dispatch, Fragment, SetStateAction } from 'react'
import DetailsTask from './DetailsTask';
import { EditTask } from './EditTask';
import { deleteTask } from './actions';
import { showToast } from '@/app/helpers/showToast';
import { useRouter } from 'next/navigation'

type MenuTaskProps = {
    task: TaskObject
    setLoading: Dispatch<SetStateAction<boolean>>
}

export default function MenuTask({task, setLoading}: MenuTaskProps) {
    
    const [isOpenModalDetailsTask, SetIsOpenModalDetailsTask] = React.useState(false)
    const [isOpenModalEditTask, SetIsOpenModalEditTask] = React.useState(false)

    const setTask = useTask((state) => state.setTask)
    const router = useRouter()

    function closeModalDetailsTask() { SetIsOpenModalDetailsTask(false) } 
    function openModalDetailsTask() { SetIsOpenModalDetailsTask(true) }

    function closeModalEditTask() { SetIsOpenModalEditTask(false) } 
    function openModalEditTask() { SetIsOpenModalEditTask(true) }

    const handleDeleteTask = async () => {
        try {
            const data = await deleteTask(task.project.toString(), task._id)
            showToast('success', data)
            if (data.error) {
                showToast('error', data.error)
                return
            }
            setLoading(true)
        } catch (error) {
            router.push('/error')
        }
    }
   
  return (
    <div className="flex shrink-0 items-center gap-x-6">

        <EditTask closeModalEditTask={closeModalEditTask} isOpenModalEditTask={isOpenModalEditTask} setLoading={setLoading}/>
        <DetailsTask closeModalDetailsTask={closeModalDetailsTask} isOpenModalDetailsTask={isOpenModalDetailsTask}/>
        
        <Menu as="div" className="relative flex-none">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">opciones</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-admintask cursor-pointer">
                    <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
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
                            <button 
                                onClick={() => { openModalDetailsTask() ; setTask(task) }}
                                className='block px-3 py-2 text-sm leading-6 text-gray-400 hover:text-gray-300 hover:bg-slate-800 transition-all w-full text-left'>
                            Ver Tarea
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button 
                                onClick={() => { openModalEditTask() ; setTask(task)}}
                                className='block px-3 py-2 text-sm leading-6 text-gray-400 hover:text-gray-300 hover:bg-slate-800 transition-all w-full text-left'>
                            Editar Tarea
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button 
                                type='button' 
                                className='block px-3 py-2 text-sm leading-6 text-red-500 hover:text-red-400 hover:bg-slate-800 transition-all w-full text-left'
                                onClick={() => handleDeleteTask() }
                            >
                                Eliminar Tarea
                            </button>
                        </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
        
    </div>
  )
}
