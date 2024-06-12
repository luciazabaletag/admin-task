import { NextResponse } from "next/server"
import Project from "@/app/models/Project"
import { validationProjectSchema } from "@/app/validation/validationSchema";
import conectarDB from "@/libs/database";
import Task from "@/app/models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";


export async function GET(req: Request, { params }: { params: { id: string } }) {

    try {
        await conectarDB()
        const { id } = params;
        const project = await Project.findById(id).populate('tasks')
        const session = await getServerSession(authOptions)
        const user = session?.user?.userId

        if (!project) {
            return NextResponse.json({ error: "Proyecto no encontrado"}, { status: 404 })
        }

        if (project.manager.toString() !== user?.toString()) {
            return NextResponse.json({ error: "Acción no válida"}, { status: 404 })
        }
        return NextResponse.json(project)

    } catch (error) {
        return NextResponse.json({ error: "Error en la peticion"}, { status: 400 })
    }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await conectarDB()
        const { id } = params;
        const request = await req.json();
        const project = await Project.findById(id)

        const session = await getServerSession(authOptions)
        const user = session?.user?.userId

        const validation = validationProjectSchema.safeParse(request)
        if (!validation.success) {
            return NextResponse.json({ error: "Error al actualizar el proyecto"}, { status: 400 })
        }
        if (project.manager.toString() !== user?.toString()) {
            return NextResponse.json({ error: "Acción no válida"}, { status: 404 })
        }

        if (!project) {
            return NextResponse.json({ error: "Proyecto no encontrado"}, { status: 404 })
        }
        
        project.clientName = request.clientName
        project.projectName = request.projectName
        project.description = request.description

        await project.save()
        return NextResponse.json("Proyecto actualizado")
        

    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar el proyecto"}, { status: 400 })
    }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await conectarDB()
        const { id } = params;
        const proj = await Project.findById(id)   
        const session = await getServerSession(authOptions)
        const user = session?.user?.userId
        if (!proj) {
            return NextResponse.json({ error: "Proyecto no encontrado"}, { status: 404 })
        }

        if (proj.manager.toString() !== user) {
            return NextResponse.json({ error: "Acción no válida"}, { status: 404 })
        }

        await Project.deleteOne(proj)
        await Task.deleteMany({project: id})

        return NextResponse.json("Proyecto eliminado")

    } catch (error) {
        return NextResponse.json({ error: "No se pudo eliminar el proyecto"}, { status: 400 })
    }
}