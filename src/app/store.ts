import { create} from 'zustand'
import { Store, Sidebar, ProjectForm, TaskGlobalObject, UseAllProjects, UserStoreI, ReloadI } from './interfaces'

export const useStore = create<Store>((set) => ({
    section: 'tasks',
    setSection: (sec) => {
        set({ section: sec})
    },
}))

export const useSidebar = create<Sidebar>((set) => ({
    sidebar: false,
    setSidebar: (sec) => {
        set({ sidebar: sec})
    },
}))

export const useReloadImage = create<ReloadI>((set) => ({
    reloadI: false,
    setReloadI: (sec) => {
        set({ reloadI: sec})
    },
}))

export const useProject = create<ProjectForm>((set) => ({
    project: {
        _id: '',
        clientName: '',
        projectName: '',
        description: '',
        tasks: []
    },
    setProject: (state) => {
        set({ project: state})
    },
}))

export const useUser = create<UserStoreI>((set) => ({
    user: {
        _id: '',
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        file: '',
        confirmed: false
    },
    setUser: (state) => {
        set({ user: state})
    },
}))

export const useAllProject = create<UseAllProjects>((set) => ({
    allProjects: [],
    setAllProjects: (state) => {
        set({ allProjects: state})
    },
}))

export const useTask = create<TaskGlobalObject>((set) => ({
    taskState: {
        _id: '',
        name: '',
    description: '',
    project: '',
    status: '',
    priority: '',
    codeTask: 0,
    createdAt: '',
    completedBy: {
        user: '',
        status: '',
    },
    notes: []
    },
    setTask: (state) => {
        set({ taskState: state})
    },
}))