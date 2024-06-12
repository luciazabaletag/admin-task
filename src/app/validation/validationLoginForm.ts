import z from "zod"

export const validationLoginForm = z.object({
    email: z.string().email({ message: "Dirección de correo electrónico no válida" }),
    password: z.string().min(4, 'El password debe contener al menos 4 caracteres'),
})