import z from "zod"

export const formProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
})

export type Project = z.infer<typeof formProjectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>