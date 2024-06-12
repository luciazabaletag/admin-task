import React from 'react'
import Spinner from '../../Spinner/Spinner';
import { useAllProject } from '@/app/store';
import { ProjectObject } from '@/app/interfaces';
import { Disclosure, Transition } from '@headlessui/react';
import { getProjects } from '../Projects/actions';

export default function Clients() {
    const [loading, setLoading] = React.useState(true);
    const allProjects = useAllProject((state) => state.allProjects)
    const setAllProjects = useAllProject((state) => state.setAllProjects)

    React.useEffect(() => {
        const allProducts = async () => {
            const dataProjects = await getProjects()
            setAllProjects(dataProjects)
            setLoading(false)
          }
          allProducts()
    }, [])
    
  return (
    <div className='mx-4 py-4'>
        {loading ? <Spinner /> : (
        <>
            <p className='text-gray-100 text-2xl font-semibold'>Clientes</p>
            <p className='text-gray-400 text-sm font-medium mb-5'>Selecciona el cliente para ver el detalle del proyecto.</p>
            {allProjects?.length ? (


            <div className="w-full pt-5">
                {allProjects?.map((prod: ProjectObject) => (
                    
                    <div key={prod._id} className=" w-full max-w-xl rounded-2xl bg-slate-950 py-2">
                        <Disclosure>
                        {({ open }) => (
                            <>
                            <Disclosure.Button as="div" className="flex w-full justify-between border-0 cursor-pointer items-center rounded-lg border-l-4 border-l-admintask bg-slate-900/50 hover:bg-slate-800/50 hover:shadow-md transition-all px-4 py-2 text-left text-sm font-semibold text-white focus:outline-none">
                               
                                    <span className='block'>{prod.clientName}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${open ? 'rotate-180 transform' : ''} h-4 w-4 text-admintask`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                
                            </Disclosure.Button>
                            <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                            <Disclosure.Panel className="px-2 pt-4">
                                <div className="flex flex-col">
                                  <div className="w-full px-1">
                                      <p className="inline-block uppercase tracking-wide border-0 border-b-2 border-admintask text-slate-100 text-xs font-bold mb-1">
                                          Nombre del proyecto
                                      </p>
                                      <p className='text-slate-300 text-sm font-base mb-1'>{prod.projectName}</p>
                                      
                                  </div>
                                  <div className="w-full px-1 mt-3">
                                      <p className="inline-block uppercase tracking-wide border-0 border-b-2 border-admintask text-slate-100 text-xs font-bold mb-1">
                                          Descripción
                                      </p>
                                      <p className='text-slate-300 text-sm font-base'>{prod.description}</p>
                                  </div>
                              </div>
                            </Disclosure.Panel>
                            </Transition>
                            </>
                        )}
                        </Disclosure>
                    </div>
                   
                ))}
            </div>

        ): (
        <div className='bg-slate-900/50 p-6 mt-10 rounded-md mx-auto max-w-sm'>
            <p className='text-white text-center text-lg'>Aún no hay clientes</p>
        </div>
        )}
        </>
        )}
    </div>
  )
}
