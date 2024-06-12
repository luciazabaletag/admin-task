"use server"

import { UserObject } from "@/app/interfaces";
import { Project, ProjectFormData } from "@/app/validation/projectForm";
import { headers } from "next/headers";

export async function getProjects(){

    const res = await fetch(`${process.env.apiUrl!}/projects`, {
        method: 'GET',
        headers: headers(),
    })
    if (!res) {
        throw new Error("Ha ocurrido un error");
    }
    return res.json()
}

export async function getProjectTasks(id: Project['_id']){
    const res = await fetch(`${process.env.apiUrl!}/projects/${id}/tasks`)
    if (!res) {
        throw new Error("Ha ocurrido un error");
    }
    return res.json()
}

export async function createProject(data: ProjectFormData, user: UserObject['_id']){

    try {
        const response = await fetch(`${process.env.apiUrl!}/projects`, {
        method: 'POST',
        body: JSON.stringify({data, user}),
        })
    
        const resp = await response.json()
        console.log(resp)
        return resp
        
    } catch (error) {
        console.log(error)
    }
}

export async function updateProject(dataForm: ProjectFormData, id: Project['_id']){

    try {
        const response = await fetch(`${process.env.apiUrl!}/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dataForm),
        })
    
        const resp = await response.json()
        return resp
        
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProject(id: Project['_id']){

    try {
        const response = await fetch(`${process.env.apiUrl!}/projects/${id}`, {
        method: 'DELETE',
        headers: headers()
        })
    
        const resp = await response.json()
        return resp
        
    } catch (error) {
        console.log(error)
    }
}