
"use client"
import React from 'react'
import { getProjects } from './actions'
import NavBarProjects from "./NavBarProjects"
import Spinner from '@/app/components/Spinner/Spinner'
import MenuProjects from '@/app/components/Section/Projects/MenuProjects'

export default function Projects() {
    const [projects, setProjects] = React.useState();
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect( () => {
        const allProducts = async () => {
          const data = await getProjects()
          setProjects(data)
          setLoading(false)
        }
        allProducts()
      }, [loading])

  return (
    <>
    {loading ? <Spinner /> : (
      <div className='w-full p-4 rounded-md'>
        <p className='text-gray-100 text-2xl font-semibold'>Proyectos</p>
        <p className='text-gray-400 text-sm font-medium mb-5'>Crea, edita, elimina o administra tus proyectos.</p>
        <NavBarProjects setLoading={setLoading}/>
        {projects.length ? (
          <div>
            <div className='w-full'>
            {projects?.map(prod => (
              <div key={prod._id} className='mt-5'>
                  <div className='p-2 sm:p-4 border-l-4 border-l-admintask bg-slate-900/50 hover:bg-slate-800/50 hover:shadow-md transition-all rounded-md mb-4'>
                    <div className='flex justify-between items-center gap-6'>
                      <div className='text-left'>
                        <p className='font-semibold text-lg sm:text-xl text-gray-200'>{prod.projectName}</p>
                        <p className='text-xs sm:text-sm text-gray-400 mt-1'>Cliente: {prod.clientName}.</p>
                        <p className='text-xs sm:text-sm text-gray-400 mt-1'>{prod.description}.</p>
                      </div>
                      <MenuProjects prod={prod} setLoading={setLoading}/>
                    </div>
                  </div>
              </div>
            ))}
            </div>
          </div>
        ): (
          <div className='bg-slate-900/50 p-6 rounded-md mx-auto max-w-sm'>
            <p className='text-white text-center text-lg'>Aún no hay proyectos</p>
          </div>
        )}
      </div>
    )}
    </>
  )
}
