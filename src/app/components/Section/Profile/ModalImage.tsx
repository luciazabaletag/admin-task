import { FileType } from '@/app/types'
import { Dialog, Transition } from '@headlessui/react'
import React, {  Dispatch, Fragment, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { updateImageUser } from './actions'
import { useSession } from 'next-auth/react'
import { useReloadImage } from '@/app/store'
import { showToast } from '@/app/helpers/showToast'

type ModalImageProps = {
    closeModalImage: () => void
    isOpenModalImage: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}

export default function ModalImage({ isOpenModalImage, closeModalImage, setLoading }:ModalImageProps) {
  const setReloadI = useReloadImage( (state) => state.setReloadI)
  const [files, setFiles ] = React.useState<FileType>()
  const { data: session} = useSession()
  const router = useRouter()

  const handleCloseInput = (e: any) => {
      const files = e.target.files = null
      setFiles(files!)
  } 

  const handleInputFiles = (e: any) => {
      const files = e.target.files
      setFiles(files[0])
  }

  const handleSubmit = async (dataForm: any) => {
      handleCloseInput(dataForm)
      dataForm.preventDefault()
      try {
        const formData = new FormData();
        formData.append("files", files!);
  
        const idUser = session?.user?.userId;
        const data = await updateImageUser(formData, idUser!)
        showToast("success", data);
        
        if (data.error) {
          showToast("error", data.error);
          return
        }
        setLoading(true)
        setReloadI(false)
      } catch (error) {
        router.push('/error')
      }
  }

  return (
    <>
    
    <Transition appear show={isOpenModalImage} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalImage} >
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
                    Imagen de perfil
                  </Dialog.Title>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <div className="flex flex-col items-center justify-center w-full">
                                <div className="mt-7 flex items-center justify-start gap-2 w-full mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" flex-shrink-0 w-4 h-4 text-slate-950">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    <p className="text-slate-950 text-sm">Selecciona una imagen de perfil.</p>
                                </div> 
    
                                <label htmlFor="file" className={`flex flex-col items-center justify-center w-full h-34 border-2 border-slate-950 border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-slate-950/10`}>
                                    {files! ? (
                                    <div className="flex flex-col py-4 px-2 w-full bg-slate-950/10">
                                        <div className="flex flex-col px-2 w-full items-end">
                                        <button onClick={(e) => handleCloseInput(e)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-slate-950">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        </div>

                                        <p className=" text-xs font-semibold md:text-sm text-slate-950 text-center px-2 mt-6 mb-10">{files.name}</p>
                                    </div>
                                    ): (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-slate-950 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-xs md:text-sm text-slate-950 text-center px-2"><span className="font-semibold inline-block">Click para subir la imagen</span></p>
                                        <p className="text-[10px] text-slate-950 text-center px-2">PNG, JPG, WEBP (MAX. 2MB)</p>
                                    </div>

                                    )}
                                    <input id="file" type="file" className="hidden" onChange={handleInputFiles}/>
                                </label> 
                            </div> 
                           
                            <div className="flex justify-center mt-3">
                              <button
                              type="submit"
                              className="inline-flex justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-gray-50 hover:bg-slate-900 focus:outline-none disabled:bg-slate-400 disabled:cursor-not-allowed"
                              onClick={closeModalImage}
                              disabled={!files}
                              >
                              Guardar imagen
                              </button>
                            </div>
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
