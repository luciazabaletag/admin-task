import User from "@/app/models/User"
import { IMAGE_TYPE, MAX_SIZE } from "@/app/constants/imageFile"
import conectarDB from "@/libs/database"
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string, formData: File } }) {
    try {
        await conectarDB()
        
        const { id } = params;
        //const request = await req.json();
        const user = await User.findById(id)
        const request = await req.formData();

        const files =  request.get('files')

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado"}, { status: 404 })
        }

        const f = files as File

        if (!files) {
            return NextResponse.json({ error: "Archivo inexistente"}, { status: 400 })
        }
        
        const size = f.size/1024

        if (size > MAX_SIZE) {
            return NextResponse.json({ error: "El archivo es demasiado grande"}, { status: 400 })
        }

        if (IMAGE_TYPE.indexOf(f.type) === -1) {
            return NextResponse.json({ error: "El archivo no es válido"}, { status: 400 })
        }
        
        const fileArrayBuffer = await f.arrayBuffer()
        const buffer = Buffer.from(fileArrayBuffer)

        user.file = buffer

        await user.save()
        return NextResponse.json("Usuario actualizado")
        
    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar usuario"}, { status: 400 })
    } 
}