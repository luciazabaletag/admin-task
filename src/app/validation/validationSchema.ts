import z from "zod"

export const validationProjectSchema = z.object({
    projectName: z.string().min(1, 'Debe contener al menos 1 caracter').max(52, 'El nombre es muy largo'),
    clientName: z.string().min(1, 'Debe contener al menos 1 caracter').max(52, 'El nombre es muy largo'),
    description: z.string().min(1, 'Debe contener al menos 1 caracter').max(200, 'Ha superado el máximo de caracteres'),
})

export const tasksStatusSchema = z.enum(['pending', 'inProgress', 'completed' ])

export const validationTaskSchema = z.object({
    name: z.string().min(1, 'Debe contener al menos 1 caracter').max(52, 'El nombre es muy largo'),
    description: z.string().min(1, 'Debe contener al menos 1 caracter').max(200),
    status: tasksStatusSchema,
    priority: z.string()
})

export type Task = z.infer<typeof validationTaskSchema>

export const validationUserSchema = z.object({
    firstName: z.string().min(1, 'Debe contener al menos 1 caracter').max(52, 'El nombre es muy largo'),
    lastName: z.string().min(1, 'Debe contener al menos 1 caracter').max(52, 'El apellido es muy largo'),
    email: z.string().email({ message: "Dirección de correo electrónico no válida" }),
    password: z.string().min(4, 'El password debe contener al menos 4 caracteres'),
})
