import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { ProjectForm } from './ProjectForm'
import { ProjectFormData } from '@/app/validation/projectForm'
import { useProject } from '@/app/store'
import { updateProject } from './actions'
import { useRouter } from 'next/navigation'
import { showToast } from '@/app/helpers/showToast'

type ProjectModal = {
    closeModal: () => void
    isOpen: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}
export const EditProject: React.FC<ProjectModal> = ({
  closeModal,
  isOpen,
  setLoading
}) => {

  const project = useProject((state) => state.project)
  const router = useRouter()

  const {register, reset, handleSubmit, formState: {errors, isDirty, isValid}} = useForm({defaultValues: {
    projectName: project.projectName,
    clientName: project.clientName,
    description: project.description
  }})

  React.useEffect(() => {
    reset({ 
      projectName: project.projectName, 
      clientName: project.clientName, 
      description: project.description})
  },[project])

  const handleEditForm = async (dataForm: ProjectFormData) => {
    setLoading(true)
    try {
      const data = await updateProject(dataForm, project._id)
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
    <> 
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    Editar Proyecto
                  </Dialog.Title>

                  <form className="w-full max-w-lg" onSubmit={handleSubmit(handleEditForm)} noValidate>
                    <ProjectForm closeModal={closeModal} register={register} errors={errors} />
                    
                    <div className="flex justify-center mt-3">
                        <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-gray-50 hover:bg-slate-900 focus:outline-none disabled:bg-slate-400 disabled:cursor-not-allowed"
                        onClick={closeModal}
                        disabled={!isDirty || !isValid}
                        >
                        Editar
                        </button>
                    </div>
                  </form>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}