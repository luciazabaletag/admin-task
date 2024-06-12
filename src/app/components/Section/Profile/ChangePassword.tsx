import { Dialog, Transition } from '@headlessui/react'
import React, {  Dispatch, Fragment, SetStateAction } from 'react'
import ErrorMessage from '../../ErrorMessage'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { validationPasswordForm } from '@/app/validation/validationPasswordForm'
import { updateUserPassword } from './actions'
import { useUser } from '@/app/store'
import { showToast } from '@/app/helpers/showToast'

type ChangePasswordProps = {
    closeModalCP: () => void
    isOpenModalCP: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}

export default function ChangePassword({ isOpenModalCP, closeModalCP, setLoading }: ChangePasswordProps) {

  const user = useUser((state) => state.user)

  const {register, reset, handleSubmit, formState: {errors, isDirty, isValid}} = useForm({defaultValues: {
      realPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(validationPasswordForm),
    mode: "all",
    })
    
  
    React.useEffect(() => {
      reset({ 
          realPassword: "",
          newPassword: ""})
    },[])

  const handleChangePassword = async (dataForm: any) => {
    const data = await updateUserPassword(dataForm, user._id)
    
    showToast("success", data);
    if (data.error) {
      showToast("error", data.error);
      return
    }
    reset()
  }

  return (
    <>
    
    <Transition appear show={isOpenModalCP} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalCP} >
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
                    Cambiar password
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(handleChangePassword)}>
                        
                        <div className="mt-4">
                            <div className="flex flex-col">
                                
                                <div className="w-full px-1 mt-3">
                                    <label className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1" htmlFor="realPassword">
                                        Password Actual
                                    </label>
                                    <input 
                                        className="appearance-none block w-full text-gray-700 border rounded py-2 px-2 mb-1 leading-tight focus:outline-none placeholder:text-sm" 
                                        id="realPassword" 
                                        type="password" 
                                        placeholder="Password actual" 
                                        {...register("realPassword")}
                                    />
                                    {errors.realPassword && (
                                        <ErrorMessage>{errors.realPassword.message}</ErrorMessage>
                                    )}
                                </div>
                                <div className="w-full px-1 mt-3">
                                    <label className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1" htmlFor="newPassword">
                                        Nuevo Password
                                    </label>
                                    <input 
                                        className="appearance-none block w-full text-gray-700 border rounded py-2 px-2 mb-1 leading-tight focus:outline-none placeholder:text-sm" 
                                        id="newPassword" 
                                        type="password" 
                                        placeholder="Nuevo Password" 
                                        {...register("newPassword")}
                                    />
                                    {errors.newPassword && (
                                        <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
                                    )}
                                </div>
                                
                            </div>
    
                        </div>
                            <div className="flex justify-center mt-3">
                                <button
                                type="submit"
                                className="inline-flex justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-gray-50 hover:bg-slate-900 focus:outline-none disabled:bg-slate-400 disabled:cursor-not-allowed"
                                onClick={closeModalCP}
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