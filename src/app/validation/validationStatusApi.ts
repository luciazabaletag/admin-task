import z from "zod"

export const validationStatusApi = z.object({
    status: z.string().min(1, 'Debe contener al menos 1 caracter').max(52, 'El nombre es muy largo'),
})