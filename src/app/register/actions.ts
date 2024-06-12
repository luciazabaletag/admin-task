"use server"

import { UserRegisterForm } from "../types"

export async function userRegister(formData: UserRegisterForm){

    try {

        const response = await fetch(`${process.env.apiUrl!}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(formData)
        })
    
        return response.json()
        
        
    } catch (error) {
        console.log(error)
    }
}