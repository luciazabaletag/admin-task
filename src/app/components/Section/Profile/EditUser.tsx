import { Dialog, Transition } from '@headlessui/react'
import React, {  Dispatch, Fragment, SetStateAction } from 'react'
import { updateUser } from './actions'
import { useReloadImage } from '@/app/store'
import ErrorMessage from '../../ErrorMessage'
import { useForm } from 'react-hook-form'
import { UserObject } from '@/app/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { validationProfileForm } from '@/app/validation/validationProfileForm'
import { showToast } from '@/app/helpers/showToast'

type ModalImageProps = {
    closeModalEditUser: () => void
    isOpenModalEditUser: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    user: UserObject
}

export default function EditUser({ isOpenModalEditUser, closeModalEditUser, setLoading, user }:ModalImageProps) {

  const setReloadI = useReloadImage( (state) => state.setReloadI)

  const {register, reset, handleSubmit, formState: {errors, isDirty, isValid}} = useForm({defaultValues: {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email
  },
  resolver: zodResolver(validationProfileForm),
  mode: "all",
  })
  

  React.useEffect(() => {
    reset({ 
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email})
  },[])

  const handleSubmitEditUser = async (dataForm: any) => {
      setLoading(true)
      const data = await updateUser(dataForm, user._id)

      showToast("success", data);

      if (data.error) {
        showToast("error", data.error);
        return
      }
      setReloadI(true)
      setLoading(false)
  }

  return (
    <>
    
    <Transition appear show={isOpenModalEditUser} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalEditUser} >
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
                    Editar usuario
                  </Dialog.Title>
                    <form onSubmit={handleSubmit(handleSubmitEditUser)}>
                        
                    <div className="mt-4">
                        <div className="flex flex-col">
                            <div className="w-full px-1">
                                <label className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1" htmlFor="firstName">
                                    Nombre
                                </label>
                                <input 
                                    className="appearance-none block w-full text-gray-700 border rounded py-2 px-2 mb-1 leading-tight focus:outline-none placeholder:text-sm" 
                                    id="firstName" 
                                    type="text" 
                                    placeholder="Nombre del usuario"
                                    {...register("firstName")}
                                />
                                {errors.firstName && (
                                    <ErrorMessage>{errors.firstName.message}</ErrorMessage>
                                )}
                            </div>
                            <div className="w-full px-1 mt-3">
                                <label className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1" htmlFor="clientName">
                                    Apellido
                                </label>
                                <input 
                                    className="appearance-none block w-full text-gray-700 border rounded py-2 px-2 mb-1 leading-tight focus:outline-none placeholder:text-sm" 
                                    id="lastName" 
                                    type="text" 
                                    placeholder="Apellido del usuario" 
                                    {...register("lastName")}
                                />
                                {errors.lastName && (
                                    <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                                )}
                            </div>
                            <div className="w-full px-1 mt-3">
                                <label className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1" htmlFor="email">
                                    Email
                                </label>
                                <input 
                                    className="appearance-none block w-full text-gray-700 border rounded py-2 px-2 mb-1 leading-tight focus:outline-none placeholder:text-sm disabled:bg-gray-300 disabled:text-gray-400" 
                                    id="email" 
                                    type="text" 
                                    disabled
                                    {...register("email")}
                                />
                            </div>
                            
                        </div>

                    </div>
                        <div className="flex justify-center mt-3">
                            <button
                            type="submit"
                            className="inline-flex justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-gray-50 hover:bg-slate-900 focus:outline-none disabled:bg-slate-400 disabled:cursor-not-allowed"
                            onClick={closeModalEditUser}
                            disabled={!isDirty || !isValid}
                            >
                            Guardar cambios
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