import conectarDB from "@/libs/database";
import Task from "@/app/models/Task";
import { validationStatusApi } from "@/app/validation/validationStatusApi";
import { NextResponse, NextRequest } from "next/server";
import { NextApiResponse } from "next";

export async function POST(req: NextRequest, { params }: { params: { taskId: string } }, res: NextApiResponse) {

    try {
        await conectarDB()
        res.setHeader('Cache-Control', 'no-store')
        const { taskId } = params;
        const task = await Task.findById(taskId)
        const request = await req.json();

        const validation = validationStatusApi.safeParse(request)
        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 })
        }
        if (!task) {
            return NextResponse.json({ error: "Tarea no encontrada"}, { status: 404 })
        }
        task.status = request.status
        await task.save()
        return NextResponse.json({ message: "El estado se ha actualizado" })
    } catch (error) {
        return NextResponse.json({ error: "No se pudo actualizar el estado"}, { status: 400 })
    }
}