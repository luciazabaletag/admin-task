import Project from "@/app/models/Project"
import { NextResponse } from 'next/server'
import conectarDB from "@/libs/database";
import { validationProjectSchema } from "@/app/validation/validationSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import Task from "@/app/models/Task";
import { NextApiResponse } from "next";

export async function POST(req: Request, res: NextApiResponse) {
    
    try {
        await conectarDB()
        res.setHeader('Cache-Control', 'no-store')
        const resp = await req.json();
        const validation = validationProjectSchema.safeParse(resp.data)
        if (!validation.success) {
            return NextResponse.json({ error: "Los campos son obligatorios"}, { status: 400 })
        }
        
        const project = new Project(resp.data)
        project.manager = resp.user

        await project.save()
        return NextResponse.json({ message: "Proyecto creado correctamente" })
    } catch (error) {
        return NextResponse.json({ error: "No se pudo crear el proyecto"}, { status: 400 })
    }
}


export async function GET(req: Request) {
    
    try {
        await conectarDB()    
        const session = await getServerSession(authOptions)
        const user = session?.user?.userId

        const project = await Project.find({
            $or: [
               { manager: { $in: user } }
            ]
        }).populate({ path: 'tasks', model: Task })
        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener proyectos"}, { status: 400 })
    } 
}