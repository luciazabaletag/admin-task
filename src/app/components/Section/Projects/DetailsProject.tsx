import { Dialog, Tab, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import TaskForm from '../Task/TaskForm'
import { useForm } from 'react-hook-form'
import { useProject } from '@/app/store'
import { TTask, TaskFormData } from '@/app/types'
import { createTask } from '../Task/actions'
import { getProjectTasks } from './actions'
import Spinner from '../../Spinner/Spinner'
import { showToast } from '@/app/helpers/showToast'
import { useRouter } from 'next/navigation'

type DetailsProjectProps = {
    closeModalDetails: () => void
    isOpenModalDetails: boolean
}

export default function DetailsProject({ closeModalDetails, isOpenModalDetails }: DetailsProjectProps) {

  const [listTasks, setListTasks] = React.useState<TTask[]>();
  const [loading, setLoading] = React.useState(true);
  const project = useProject((state) => state.project)
  const router = useRouter()
  
  const handleTasks = async () => {
    const data = await getProjectTasks(project._id)
      setListTasks(data)
      setLoading(false)
  }
    
  const {register, reset, handleSubmit, watch, formState: {errors, isDirty, isValid}} = useForm({defaultValues: {
      name: '',
      description: '',
      status: 'pending',
      priority: 'medium'
    }})
  
  function classNames(...classes){
      return classes.filter(Boolean).join(' ')
    }

  const handleCreateTask = async (formData : TaskFormData) => {

    try {
      const data = await createTask(formData, project._id)
      showToast("success", data);
      reset()
      if (data.error) {
        showToast("error", data.error);
        return
      }
    } catch (error) {
      router.push('error')
    }
  }

  return (
    <>
    <Transition appear show={isOpenModalDetails} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalDetails} >
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
                    Detalles del proyecto
                  </Dialog.Title>

                  <Tab.Group>
                        <Tab.List className="flex mt-5">
                            <Tab 
                            className={({ selected}) => classNames(
                                'w-full pb-1',
                                selected
                                    ? 'text-slate-800 font-semibold border-b-2 border-admintask'
                                    : 'text-slate-600 font-medium hover:text-slate-500 border-b-2 border-admintask/30'
                            )}
                            >
                            Detalles</Tab>
                            <Tab 
                              onClick={handleTasks}
                              className={({ selected}) => classNames(
                                  'w-full pb-1',
                                  selected
                                      ? 'text-slate-800 font-semibold border-b-2 border-admintask opacity-100'
                                      : 'text-slate-600 font-medium hover:text-slate-500 border-b-2 border-admintask/30'
                              )}>
                            Tareas</Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel className="min-h-60">
                              <div className="flex flex-col mt-5">
                                  <div className="w-full px-1">
                                      <p className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1">
                                          Nombre del proyecto
                                      </p>
                                      <p className='text-slate-600 text-sm font-base mb-1'>{project.projectName}</p>
                                      
                                  </div>
                                  <div className="w-full px-1 mt-3">
                                      <p className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1">
                                          Cliente
                                      </p>
                                      <p className='text-slate-600 text-sm font-base mb-1'>{project.clientName}</p>
                                  </div>
                                  <div className="w-full px-1 mt-3">
                                      <p className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1">
                                          Descripción
                                      </p>
                                      <p className='text-slate-600 text-sm font-base mb-1'>{project.description}</p>
                                  </div>
                              </div>
                            </Tab.Panel>
                            <Tab.Panel className="min-h-60">
                              {loading ? <Spinner /> : (
                                <>
                                  <div className='mt-5'>
                                    {listTasks?.length === 0 ? (
                                      <p className='text-slate-600 text-sm font-base my-5 text-center'>Este proyecto aún no tiene tareas asignadas.</p>
                                    ): (
                                        listTasks?.map((task: TTask) => (
                                          <div 
                                            key={task._id}
                                            className='mt-2 bg-gray-50 rounded-md p-2 border border-slate-200 hover:bg-gray-100'
                                          >
                                            <div className='flex gap-1 items-center mb-1'>
                                              <p className='uppercase tracking-wide text-slate-800 text-xs font-bold'>Nombre:</p>
                                              <p className='text-slate-600 text-sm font-base'>{task.name}</p>
                                            </div>
                                            <div className='flex gap-1 items-center'>
                                              <p className='uppercase tracking-wide text-slate-800 text-xs font-bold'>Descripción:</p>
                                              <p className='text-slate-600 text-sm font-base'>{task.description}</p>
                                            </div>
                                          </div>
                                        ))
                                    )}
                                  </div>

                                  <form className="w-full" onSubmit={handleSubmit(handleCreateTask)} noValidate>
                                      <TaskForm errors={errors} register={register} watch={watch}/>
                                      <div className="flex justify-center mt-3">
                                          <button
                                          type="submit"
                                          className="inline-flex justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-gray-50 hover:bg-slate-900 focus:outline-none disabled:bg-slate-400 disabled:cursor-not-allowed"
                                          onClick={closeModalDetails}
                                          disabled={!isDirty || !isValid}
                                          >
                                          Crear tarea
                                          </button>
                                      </div>
                                  </form>
                                </>
                              )}
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
