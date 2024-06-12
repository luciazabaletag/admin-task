import User from "@/app/models/User"
import conectarDB from "@/libs/database"
import { NextResponse } from "next/server";
import { UserRegisterForm } from "@/app/types"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        await conectarDB()
        const { id } = params;
        const user = await User.findById(id)
       
        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado"}, { status: 404 })
        }
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener usuario"}, { status: 400 })
    } 
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await conectarDB()
        
        const { id } = params;
        const user = await User.findById(id)
        const request = await req.json();

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado"}, { status: 404 })
        }

        user.firstName = request.firstName
        user.lastName = request.lastName

        await user.save()
        return NextResponse.json("Usuario actualizado")
        
    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar usuario"}, { status: 400 })
    } 
}