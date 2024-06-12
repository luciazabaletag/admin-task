import { Dialog, Transition } from '@headlessui/react'
import React, { Dispatch, Fragment, SetStateAction } from 'react'
import TaskForm from './TaskForm'
import { createTask } from './actions'
import { useForm } from 'react-hook-form'
import { useAllProject } from '@/app/store'
import { TaskFormData } from '@/app/types'
import ErrorMessage from '../../ErrorMessage'
import { ProjectObject } from '@/app/interfaces'
import { showToast } from '@/app/helpers/showToast'
import { useRouter } from 'next/navigation'

type CreateTaskProps = {
    closeModalCreateTask: () => void
    isOpenModalCreateTask: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}

export const CreateTask: React.FC<CreateTaskProps> = ({
    closeModalCreateTask,
    isOpenModalCreateTask,
    setLoading
}) => {

    const {register, handleSubmit, watch, reset, formState: {errors, isDirty, isValid}} = useForm({defaultValues: {
        name: '',
        description: '',
        project: '',
        status: 'pending',
        priority: 'medium'
      }})
    const [ projectId, setProjectId] = React.useState('')
    
    const allProjects = useAllProject((state) => state.allProjects)
    const router = useRouter()
    
    const handleChange = (e: string) => {
      setProjectId(e)
    }
    const handleCreateTask = async (formData : TaskFormData) => {
      try {
        const data = await createTask(formData, projectId)
        showToast("success", data);
        if (data.error) {
          showToast("error", data.error);
          return
        }
        setLoading(true)
        reset()
      } catch (error) {
        router.push('/error')
      }
    }

  return (
    <>
      <Transition appear show={isOpenModalCreateTask} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalCreateTask}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900 text-center"
                  >
                    Crear Tarea
                  </Dialog.Title>
                  {allProjects.length ? (

                      <form className="w-full max-w-lg" onSubmit={handleSubmit(handleCreateTask)} noValidate>
                        <TaskForm register={register} errors={errors} watch={watch}/>
                        <div className="w-full px-1 mt-3">
                            <label className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1" htmlFor="description">
                                Proyecto
                            </label>
                            <select 
                              className="w-full text-gray-700 border rounded py-2 px-2 mb-1 text-sm focus:outline-none bg-white"
                              id='project'
                              {...register("project", {
                                onChange: (e) => {handleChange(e.target.value)},
                                required: "Es obligatorio seleccionar un proyecto."
                            })}
                            >
                              <option className="font-xs text-slate-800/50" disabled>-- Seleccione un proyecto --</option>
                                {allProjects?.map(( proj : ProjectObject) => (
                                
                                  <option className="font-sans" key={proj._id} value={proj._id}>{proj.projectName}</option>
                                  
                                ))}
                            </select>
                            {errors.project && (
                                <ErrorMessage>{errors.project.message}</ErrorMessage>
                            )}
                        </div>
                        <div className="flex justify-center mt-3">
                            <button
                            type="submit"
                            className="inline-flex justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-gray-50 hover:bg-slate-900 focus:outline-none disabled:bg-slate-400 disabled:cursor-not-allowed"
                            onClick={closeModalCreateTask}
                            disabled={!isDirty || !isValid}
                            >
                            Crear
                            </button>
                        </div>
                      </form>
                  ) : (
                    <>
                      <p className='text-center mt-3 text-slate-800 text-sm'>Aún no tienes ningún proyecto. Debes crear uno para poder asignarle tareas.</p>
                      <div className="flex justify-center mt-5">
                        <button
                        type="button"
                        className="inline-flex justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-gray-50 hover:bg-slate-900 focus:outline-none"
                        onClick={closeModalCreateTask}
                        >
                        Cerrar
                        </button>
                    </div>
                    </>
                  )}

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
