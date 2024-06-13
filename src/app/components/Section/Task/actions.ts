"use server"

import { TTask, TaskFormData } from "@/app/types"
import { Project } from "@/app/validation/projectForm"

export async function getAllTasks(){
    const res = await fetch(`${process.env.apiUrl!}/tasks`)
    if (!res) {
        throw new Error("Ha ocurrido un error");
    }
    return res.json()
}


export async function createTask(formData: TaskFormData, projectId: Project['_id']){

    try {
        const response = await fetch(`${process.env.apiUrl!}/projects/${projectId}/tasks`, {
        method: 'POST',
        body: JSON.stringify(formData),
        cache: 'no-store',
        })
    
        const resp = await response.json()
        return resp
        
    } catch (error) {
        console.log(error)
    }
}

export async function updateTask(dataForm: TaskFormData, projectId: Project['_id'], taskId: TTask['_id']){

    try {
        const response = await fetch(`${process.env.apiUrl!}/projects/${projectId}/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify(dataForm),
        })
    
        const resp = await response.json()
        return resp
        
    } catch (error) {
        console.log(error)
    }
}

export async function deleteTask(id: Project['_id'], taskId: TTask['_id']){

    try {
        const response = await fetch(`${process.env.apiUrl!}/projects/${id}/tasks/${taskId}`, {
        method: 'DELETE',
        })
    
        const resp = await response.json()
        return resp
        
    } catch (error) {
        console.log(error)
    }
}