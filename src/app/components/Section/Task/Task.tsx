import React from "react"
import NavBarTask from "./NavBarTask"
import { useAllProject } from "@/app/store"
import { TASK_STATUS } from "@/app/constants/statusTasks"
import Spinner from "../../Spinner/Spinner"
import MenuTask from "./MenuTask"
import { getProjects } from "../Projects/actions"
import { CODE_TASK } from "@/app/constants/codeTask"
import { formatTaskCode } from "@/app/utils/formatTaskCode"
import IconPriority from "../../IconPriority/Icon"
import { useRouter } from "next/navigation"
import { TaskObject } from "@/app/interfaces"

export default function Task() {
    const [tasks, setTasks] = React.useState<TaskObject[]>();
    const [inProgress, setInProgress] = React.useState<TaskObject[]>();
    const [pending, setPending] = React.useState<TaskObject[]>();
    const [completed, setCompleted] = React.useState<TaskObject[]>();
    const [loading, setLoading] = React.useState(true);

    const setAllProjects = useAllProject((state) => state.setAllProjects)
    const router = useRouter()

    React.useEffect( () => {
        const allProducts = async () => {
            try {

                const dataProjects = await getProjects()
                if (dataProjects.error) {
                    return router.push('/error')
                }

                setAllProjects(dataProjects)
                let allTasks: TaskObject[] = [];

                for (let i = 0; i < dataProjects.length; i++) {
                    allTasks = allTasks.concat(dataProjects[i].tasks)
                    setTasks(allTasks)
                }

                setPending(tasks?.filter( (x: TaskObject) => x.status === TASK_STATUS.PENDING))
                setInProgress(tasks?.filter( (x: TaskObject) => x.status === TASK_STATUS.IN_PROGRESS))
                setCompleted(tasks?.filter( (x: TaskObject) => x.status === TASK_STATUS.COMPLETED))

                setLoading(false)
            
            } catch (error) {
            router.push('/error')
            }        
        }
        allProducts()
    }, [loading])
 
    return (

        <div className='mx-4 py-4'>
            {loading ? <Spinner /> : (
            <>
                <p className='text-gray-100 text-2xl font-semibold'>Tareas</p>
                <p className='text-gray-400 text-sm font-medium mb-5'>Desde aquí podrás crear, editar y administrar tus tareas.</p>
                <NavBarTask setLoading={setLoading}/>
                <div className='flex flex-col lg:flex-row gap-10 lg:gap-3 items-center lg:items-start justify-between w-full'>
                    <div className='max-w-md lg:max-w-sm border-t-4 border-t-admintask border-x border-b border-b-gray-900 border-x-gray-900 w-full rounded-lg p-2 pb-3'>
                        <div>
                            <p className='text-white text-center font-semibold'>Por hacer</p>
                        </div>

                        {pending?.length === 0 ? (
                            <p className="text-gray-500 text-center pt-3">No Hay tareas</p>
                        ) : (
                            pending?.map((task: TaskObject) => (
                                <div key={task._id}>
                                    
                                    <div className='border border-gray-700 rounded-md w-full p-2 mt-2 bg-slate-900/50 hover:bg-slate-800/50 hover:shadow-md transition-all'>
                                        <div className='flex justify-between gap-3 items-center'>
                                            <p className='text-white font-semibold text-sm'>{task.name}</p>
                                            <MenuTask task={task} setLoading={setLoading}/>
                                        </div>
                                        <div className='flex justify-between items-center mt-1'>
                                            <div className='flex gap-1 items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 text-admintask">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                <p className='text-gray-300 text-xs'>{`${CODE_TASK}-${formatTaskCode(task.codeTask)}`}</p>
                                            </div>
                                            <div className="mr-0.5">
                                                <IconPriority name={task.priority} />
                                            </div>
                                        </div>
                                    </div>
                            
                                </div>
                            ))
                        )}
                    </div>


                    <div className='max-w-md lg:max-w-sm  border-t-4 border-blue-500 border-x border-b border-b-gray-900 border-x-gray-900 w-full rounded-lg p-2 pb-3'>
                        <div>
                            <p className='text-white text-center font-semibold'>En curso</p>
                        </div>
                    
                        {inProgress?.length === 0 ? (
                            <p className="text-gray-500 text-center pt-3">No Hay tareas</p>
                        ) : (
                            inProgress?.map((task: TaskObject) => (
                                <div key={task._id}>
                                    <div className='border border-gray-700 rounded-md w-full p-2 mt-2 bg-slate-900/50 hover:bg-slate-800/50 hover:shadow-md transition-all'>
                                        <div className='flex justify-between gap-3 items-center'>
                                            <p className='text-white font-semibold text-sm'>{task.name}</p>
                                            <MenuTask task={task} setLoading={setLoading}/>
                                        </div>
                                        <div className='flex justify-between items-center mt-1'>
                                            <div className='flex gap-1 items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-admintask">
                                                    <path fillRule="evenodd" d="M14.447 3.026a.75.75 0 0 1 .527.921l-4.5 16.5a.75.75 0 0 1-1.448-.394l4.5-16.5a.75.75 0 0 1 .921-.527ZM16.72 6.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 0 1 0-1.06Zm-9.44 0a.75.75 0 0 1 0 1.06L2.56 12l4.72 4.72a.75.75 0 0 1-1.06 1.06L.97 12.53a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                                </svg>
                                                <p className='text-gray-300 text-xs'>{`${CODE_TASK}-${formatTaskCode(task.codeTask)}`}</p>
                                            </div>
                                            <div className="mr-0.5">
                                                <IconPriority name={task.priority} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>


                    <div className='max-w-md lg:max-w-sm  border-t-4 border-red-500 border-x border-b border-b-gray-900 border-x-gray-900 w-full rounded-lg p-2 pb-3'>
                        <div>
                            <p className='text-white text-center font-semibold'>Finalizadas</p>
                        </div>
                        
                        {completed?.length === 0 ? (
                            <p className="text-gray-500 text-center pt-3">No Hay tareas</p>
                        ) : (
                            completed?.map((task: TaskObject) => (
                                <div key={task._id}>
                                    <div className='border border-gray-700 rounded-md w-full p-2 mt-2 bg-slate-900/50 hover:bg-slate-800/50 hover:shadow-md transition-all'>
                                        <div className='flex justify-between gap-3 items-center'>
                                            <p className='text-white font-semibold text-sm'>{task.name}</p>
                                            <MenuTask task={task} setLoading={setLoading}/>
                                        </div>
                                        <div className='flex justify-between items-center mt-1'>
                                            <div className='flex gap-1 items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-admintask">
                                                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                                </svg>
                                                <p className='text-gray-300 text-xs'>{`${CODE_TASK}-${formatTaskCode(task.codeTask)}`}</p>
                                            </div>
                                            <div className="mr-0.5">
                                                <IconPriority name={task.priority} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </>
        )}
        </div>
    )
}
