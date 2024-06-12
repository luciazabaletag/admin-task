"use server"
import { UserObject } from "@/app/interfaces"
import { UserRegisterForm } from "@/app/types"

export async function updateImageUser(dataForm: FormData, id: UserObject['_id']){

    try {
        const response = await fetch(`${process.env.apiUrl!}/users/${id}/image`, {
        method: 'PUT',
        body: dataForm,
        })
    
        const resp = await response.json()
        return resp
        
    } catch (error) {
        console.log(error)
    }
}

export async function updateUser(dataForm: UserRegisterForm, id: UserObject['_id']){
    try {
        const response = await fetch(`${process.env.apiUrl!}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(dataForm),
            })
        
            const resp = await response.json()
            return resp
    } catch (error) {
        console.log(error)
    }
}

export async function updateUserPassword(dataForm: UserRegisterForm, id: UserObject['_id']){
    try {
        const response = await fetch(`${process.env.apiUrl!}/users/${id}/password`, {
            method: 'PUT',
            body: JSON.stringify(dataForm),
            })
        
            const resp = await response.json()
            return resp
    } catch (error) {
        console.log(error)
    }
}

