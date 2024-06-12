import conectarDB from "@/libs/database";
import { NextResponse } from "next/server";
import User from "@/app/models/User";
import bcrypt from "bcryptjs"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await conectarDB()
        
        const { id } = params;
        const user = await User.findById(id)
        const { realPassword, newPassword } = await req.json();

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado"}, { status: 404 })
        }

        if (realPassword === newPassword) {
            return NextResponse.json({ error: "Error al actualizar el password"}, { status: 400 })
        }
        
        const hashPassword = await bcrypt.hash(newPassword, 12)

        user.password = hashPassword

        await user.save()
        return NextResponse.json("Usuario actualizado")
        
    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar usuario"}, { status: 400 })
    } 
}