import {  User } from "next-auth"


export interface Store {
    section: string
    setSection: (sec: string) => void
}

export interface Sidebar {
    sidebar: boolean
    setSidebar: (sec: boolean) => void
}
export interface ReloadI {
    reloadI: boolean
    setReloadI: (sec: boolean) => void
}
export interface ProjectForm {
    project: ProjectObject
    setProject: (state: ProjectObject) => void
}

export interface UserStoreI {
    user: UserObject
    setUser: (state: UserObject) => void
}

export interface UseAllProjects {
    allProjects: []
    setAllProjects: (state: []) => void
}

export interface TaskGlobalObject {
    taskState: TaskObject
    setTask: (state: TaskObject) => void
}

export interface UserObject {
    _id: string
    firstName: string
    lastName: string
    password: string
    email: string
    file: string
    confirmed: boolean
}

export interface TaskObject {
    _id: string
    name: string
    description: string
    project: string
    status: string
    priority: string
    codeTask: Number
    createdAt: string
    completedBy: {
        user: string,
        status: string
    }
    notes: []
}
export interface ProjectObject {
        _id: string
        clientName: string
        projectName: string
        description: string 
        tasks: []
}

export interface UserObject {
    _id: string
    firstName: string
    lastName: string
    password: string
    email: string
    file: string
    confirmed: boolean
}

