import z from "zod"

export const validationPasswordForm = z.object({
    realPassword: z.string().min(4, 'El password debe contener al menos 4 caracteres'),
    newPassword: z.string().min(4, 'El password debe contener al menos 4 caracteres'),
})