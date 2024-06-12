export const TASK_STATUS = {
    PENDING: 'pending',
    IN_PROGRESS: 'inProgress',
    COMPLETED: 'completed'
} as const

type StatusType = {[key: string]: string};

export const TASK_COLORS : StatusType = {
    "pending": 'bg-admintask',
    "inProgress": 'bg-blue-500',
    "completed": 'bg-red-500'
}

export const TASK_STATUS_NAME : StatusType = {
    "pending": 'Pendiente',
    "inProgress": 'En curso',
    "completed": 'Finalizada'
}