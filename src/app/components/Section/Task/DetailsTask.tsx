import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { useTask } from '@/app/store'
import { TASK_COLORS, TASK_STATUS_NAME } from '@/app/constants/statusTasks'
import { formatDate } from '@/app/utils/formatDate'
import { TASK_PRIORITY_NAME } from '@/app/constants/priorityTask'
import IconPriority from '../../IconPriority/Icon'


type DetailsTaskProps = {
    closeModalDetailsTask: () => void
    isOpenModalDetailsTask: boolean
}

export default function DetailsTask({ closeModalDetailsTask, isOpenModalDetailsTask }: DetailsTaskProps) {

    const taskState = useTask((state) => state.taskState)

  return (
    <>
    <Transition appear show={isOpenModalDetailsTask} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalDetailsTask} >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md max-h-[500px] overflow-y-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900 text-center"
                  >
                    Detalles de la tarea
                  </Dialog.Title>
                    <div className="flex flex-col mt-5">
                        <div className="w-full px-1">
                            <p className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1">
                                Nombre de la tarea
                            </p>
                            <p className='text-slate-600 text-sm font-base mb-1'>{taskState.name}</p>
                            
                        </div>
                        <div className="w-full px-1 mt-3">
                            <p className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1">
                                Descripción
                            </p>
                            <p className='text-slate-600 text-sm font-base mb-1'>{taskState.description}</p>
                        </div>
                        
                        <div className="w-full px-1 mt-3">
                            <p className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1">
                                Creada
                            </p>
                            <p className='text-slate-600 text-sm font-base mb-1'>{formatDate(taskState.createdAt)}</p>
                        </div>
                        <div className="px-1 mt-3">
                            <p className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1">
                                Estado
                            </p>
                            <div className='flex gap-1 items-center'>
                              <span className={` ${TASK_COLORS[taskState.status]} h-2 w-2 rounded-full block`}></span>
                              <p className={'inline-block text-slate-600 rounded-md text-sm font-base'}>{TASK_STATUS_NAME[taskState.status]}</p>
                            </div>
                        </div>
                        <div className="px-1 mt-3">
                            <p className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1">
                                Prioridad
                            </p>
                            <div className='flex gap-1 items-center'>
                              <IconPriority name={taskState.priority} />
                              <p className={'inline-block text-slate-600 rounded-md text-sm font-base'}>{TASK_PRIORITY_NAME[taskState.priority]}</p>
                            </div>
                        </div>
                    </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
