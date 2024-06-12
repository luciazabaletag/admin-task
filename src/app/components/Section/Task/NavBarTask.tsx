import React, { Dispatch, SetStateAction } from 'react'
import { CreateTask } from './CreateTask'

type NavBarTaskProps = {
    setLoading: Dispatch<SetStateAction<boolean>>
}
export default function NavBarTask({setLoading}: NavBarTaskProps) {
    
    const [isOpenModalCreateTask, setIsOpenModalCreateTask] = React.useState(false)
    function closeModalCreateTask() { setIsOpenModalCreateTask(false) } 
    function openModalCreateTask() { setIsOpenModalCreateTask(true) }

    const handleRefresh = () => {
        setLoading(true)
      }

  return (
    <div className='flex justify-end gap-3 w-full mb-5'>
        <CreateTask closeModalCreateTask={closeModalCreateTask} isOpenModalCreateTask={isOpenModalCreateTask} setLoading={setLoading}/>

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
        <button 
            type='button' 
            className='text-admintask  relative group'
            onClick={openModalCreateTask}    
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span
            className="pointer-events-none absolute bg-gray-900 text-gray-300 py-1 px-2 rounded-md -top-10 -left-20 w-max opacity-0 transition-opacity group-hover:opacity-100"
            >
            Crear Tarea
            </span>
        </button>
    </div>
  )
}
