import z from "zod"

export const validationProfileForm = z.object({
    firstName: z.string().min(1, 'Debe contener al menos 1 caracter').max(52, 'El nombre es muy largo'),
    lastName: z.string().min(1, 'Debe contener al menos 1 caracter').max(52, 'El apellido es muy largo')
})