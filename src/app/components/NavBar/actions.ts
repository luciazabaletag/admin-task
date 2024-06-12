"use server"
import { UserObject } from "@/app/interfaces"

export async function getUser( id: UserObject['_id']){

    try {
        const response = await fetch(`${process.env.apiUrl!}/users/${id}`, {
        method: 'GET'
        })
    
        const resp = await response.json()
        return resp
        
    } catch (error) {
        console.log(error)
    }
}