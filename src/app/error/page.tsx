
import React from 'react'
import ButtonError from '../components/ButtonError/ButtonError'

export default function page() {
  return (
    <div className='bg-slate-950 min-h-screen flex justify-center items-center'>
        <div className='border border-gray-800 p-10 rounded-md text-center'>
            <div className='flex justify-center mb-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-red-600 text-center">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            </div>
            <h1 className='text-gray-100 text-3xl font-semibold'>Ups! Ah ocurrido un error!</h1>
            <h3 className='text-gray-100 text-md mt-1'>Por favor, vuelve a intentarlo más tarde, ¡Muchas gracias!.</h3>
            <div className='flex justify-center mt-5'>
              <ButtonError />
            </div>
        </div>
    </div>
  )
}
