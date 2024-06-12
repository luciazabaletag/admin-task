import { Document, Types, PopulatedDoc } from "mongoose"
import { TASK_STATUS } from "../constants/statusTasks"
import { Task } from "../validation/validationSchema"

export type ProjectType = Document & {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<TTask & Document>[]
    manager: PopulatedDoc<TUser & Document>
}

export type TTask = Document & {
    name: string
    description: string
    project: Types.ObjectId
    codeTask: Number
    status: TaskStatus
    priority: string
    completedBy: {
        user: Types.ObjectId,
        status: TaskStatus
    }[]
    notes: Types.ObjectId[]
}

export type TUser = Document & {
    firstName: string
    lastName: string
    password: string
    email: string
    file: Object
    confirmed: boolean
}
export interface FileType extends Blob {
    lastModified: number
    name: string
    size: number
    type: string
    webkitRelativePath: string
}




export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS]

export type TaskFormData = Pick<Task, 'name' | 'description' | 'priority' | 'status'>
export type TaskFormDataProject = Pick<Task, 'name' | 'description' | 'project' | 'priority'>

export type UserRegisterForm = Pick<TUser, 'firstName'| 'lastName' | 'password' | 'email'>
export type UserLogInForm = Pick<TUser, 'password' | 'email'>