import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/models/Project";
import Task from "@/app/models/Task";
import conectarDB from "@/libs/database";
import { validationTaskSchema } from "@/app/validation/validationSchema";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {

    try {
        await conectarDB()
        const { id } = params;
        const project = await Project.findById(id)
        const request = await req.json();
        const counterTask = (await Task.find({}).sort({_id: -1}).limit(1))[0];

        if (!project) {
            return NextResponse.json({ error: "Proyecto no encontrado"}, { status: 404 })
        }
        const validation = validationTaskSchema.safeParse(request)
        if (!validation.success) {
            return NextResponse.json({ error: "No se pudo crear la tarea"}, { status: 400 })
        }
        
        const task = new Task(request)
        counterTask === undefined ? task.codeTask = 1 : task.codeTask = counterTask.codeTask + 1
        task.project = project.id
        project.tasks.push(task.id) 
        await Promise.allSettled([task.save(), project.save()])
        return NextResponse.json("Tarea creada correctamente")

    } catch (error) {
        return NextResponse.json({ error: "No se pudo crear la tarea"}, { status: 400 }) 
    }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await conectarDB()
        const { id } = params;
        const project = await Project.findById(id)
        
        if (!project) {
            return NextResponse.json({ error: "Proyecto no encontrado"}, { status: 404 })
        }
        const task = await Task.find({project: id}).populate('project')
        return NextResponse.json(task)

    } catch (error) {
        return NextResponse.json({ error: "Tarea no encontrada"}, { status: 400 }) 
    }
}