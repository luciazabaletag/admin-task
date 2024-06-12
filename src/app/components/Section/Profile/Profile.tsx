import React from 'react'
import Image from 'next/image'
import UserImage from '@/app/assets/users/profile.png'
import ModalImage from './ModalImage'
import Spinner from '../../Spinner/Spinner'
import { useUser } from '@/app/store'
import EditUser from './EditUser'
import { getUser } from '../../NavBar/actions'
import ChangePassword from './ChangePassword'

export default function Profile() {
    const [isOpenModalImage, SetIsOpenModalImage] = React.useState(false)
    const [isOpenModalEditUser, SetIsOpenModalEditUser] = React.useState(false)
    const [isOpenModalCP, SetIsOpenModalCP] = React.useState(false)
    const [loading, setLoading] = React.useState(true);
    const [imageProfile, setImageProfile] = React.useState('')

    const user = useUser((state) => state.user)
    const setUser = useUser((state) => state.setUser)

    function closeModalImage() { SetIsOpenModalImage(false) } 
    function openModalImage() { SetIsOpenModalImage(true) }

    function closeModalEditUser() { SetIsOpenModalEditUser(false) } 
    function openModalEditUser() { SetIsOpenModalEditUser(true) }

    function closeModalCP() { SetIsOpenModalCP(false) } 
    function openModalCP() { SetIsOpenModalCP(true) }

    const getUserData = async () => {
        const data = await getUser(user._id);
        setUser(data);
        if (data) setImageProfile(Buffer.from(user?.file).toString('base64'));
        setLoading(false)
    }

    React.useEffect( () => { getUserData(); }, [loading]);
   

  return (
    <>
      <ChangePassword isOpenModalCP={isOpenModalCP} closeModalCP={closeModalCP} setLoading={setLoading}/>
      <ModalImage isOpenModalImage={isOpenModalImage} closeModalImage={closeModalImage} setLoading={setLoading}/>
      <EditUser isOpenModalEditUser={isOpenModalEditUser} closeModalEditUser={closeModalEditUser} setLoading={setLoading} user={user}/>
      {loading ? <Spinner /> : (
      <div className='w-full p-4'>
        <p className='text-gray-100 text-2xl font-semibold'>Perfil</p>
        <div className='flex flex-col sm:flex-row sm:gap-5 w-full'>
            <div className='mt-10 sm:max-w-72 w-full bg-slate-900/50 rounded-md'>
                <div className='flex flex-col items-center mt-10'>
                    {imageProfile.length ? (
                        <Image width={128} height={128} className='rounded-lg w-32 h-32 object-cover' src={`data:image/webp;charset=utf-8;base64,${imageProfile}`} alt='imagen usuario'/>
                    ) : (
                        <Image className='rounded-lg w-32 h-32 object-cover' src={UserImage} alt='imagen usuario'/>
                    )}
                    <div>
                        <p className='text-xl text-center text-gray-100 font-semibold mt-3 first-letter:uppercase'>{`${user?.firstName} ${user?.lastName}`}</p>
                    </div>
                    <p className='text-xs text-gray-300'>{user?.email}</p>
                    <p className='text-admintask text-xs'>Colaborador</p>
                </div>
                <div className='mt-5'>
                       
                    <span className="border-b border-gray-900 mt-3 block"></span>
                </div>
                <div className='flex justify-around items-center mt-5 mb-10'>
                    <button type='button' className='text-admintask relative group' onClick={() => openModalEditUser()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-admintask">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <span
                        className="pointer-events-none absolute bg-gray-900 text-gray-300 py-1 px-2 rounded-md -top-10 -left-10 w-max opacity-0 transition-opacity group-hover:opacity-100"
                        >
                        Editar Usuario
                        </span>
                    </button>
                    <button type='button' className='text-admintask relative group' onClick={() => openModalImage()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-admintask">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        <span
                        className="pointer-events-none absolute bg-gray-900 text-gray-300 py-1 px-2 rounded-md -top-10 -left-10 w-max opacity-0 transition-opacity group-hover:opacity-100"
                        >
                        Editar Imagen
                        </span>
                    </button>
                    <button type='button' className='text-admintask relative group' onClick={() => openModalCP()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-admintask">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <span
                        className="pointer-events-none absolute bg-gray-900 text-gray-300 py-1 px-2 rounded-md -top-10 -left-10 w-max opacity-0 transition-opacity group-hover:opacity-100"
                        >
                        Cambiar password
                        </span>
                    </button>
                </div>
            </div>

            <div className='mt-10 w-full bg-slate-900/50 rounded-md p-5'>
                <p className='text-xl text-left text-gray-100 font-semibold border-b-4 border-b-admintask tracking-wide inline'>Información personal y Roles</p>
                <div className='flex flex-col lg:flex-row justify-between py-6 gap-4'>
                    <div>
                        <p className='flex flex-cols text-md font-semibold text-gray-300'>Nombre:</p>
                        <div>
                            <p className='text-sm text-gray-300 first-letter:uppercase'>{`${user?.firstName} ${user?.lastName}`}</p>
                        </div>
                    </div>
                    <div>
                        <p className='flex flex-col text-md font-semibold text-gray-300'>Email:</p>
                        <p className='text-sm text-gray-300'>{user?.email}</p>
                    </div>
                    <div>
                        <p className='flex flex-col text-md font-semibold text-gray-300'>Rol:</p>
                        <p className='text-sm text-gray-300'>Colaborador</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )}
    </>
  )
}
