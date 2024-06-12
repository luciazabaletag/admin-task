import { NextRequest, NextResponse } from "next/server";
import conectarDB from "@/libs/database";
import Task from "@/app/models/Task";
import Project from "@/app/models/Project";

export async function GET(req: NextRequest, { params }: { params: { taskId: string, id: string } }) {
    try {
        await conectarDB()
        const { taskId, id } = params;
        const task = await Task.findById(taskId)
        
        if (!task) {
            return NextResponse.json({ error: "Tarea no encontrada"}, { status: 404 })
        }
        if (task.project.toString() !== id) {
            return NextResponse.json({ error: "Acción no válida"}, { status: 400 })
        }
        
        return NextResponse.json(task)

    } catch (error) {
        return NextResponse.json({ error: "Tarea no encontrada"}, { status: 400 }) 
    }
}

export async function PUT(req: NextRequest, { params }: { params: { taskId: string, id: string } }) {
    try {
        await conectarDB()
        const { taskId, id } = params;
        const request = await req.json();

        const task = await Task.findById(taskId)
        
        if (!task) {
            return NextResponse.json({ error: "Tarea no encontrada"}, { status: 404 })
        }
        if (task.project.toString() !== id) {
            return NextResponse.json({ error: "Acción no válida"}, { status: 400 })
        }

        task.name = request.name
        task.description = request.description
        task.priority = request.priority
        task.status = request.status
        await task.save()
        
        return NextResponse.json("Tarea actualizada correctamente")

    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar la tarea"}, { status: 400 }) 
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { taskId: string, id: string} }) {

    try {
        await conectarDB()
        const { taskId, id } = params;

         const task = await Task.findById(taskId)
         const project = await Project.findById(id)
         project.tasks = project.tasks.filter((task: string) => task.toString() !== taskId)
        
        if (!task) {
            return NextResponse.json({ error: "Tarea no encontrada"}, { status: 404 })
        }
        
        await Promise.allSettled([task.deleteOne(), project.save()])
          
        return NextResponse.json("Tarea eliminada correctamente")

    } catch (error) {
        return NextResponse.json({ error: "No se pudo eliminar la tarea"}, { status: 400 }) 
    }
}