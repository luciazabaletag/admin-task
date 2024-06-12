import { NextRequest, NextResponse } from 'next/server'
import conectarDB from "@/libs/database";
import { validationUserSchema } from '@/app/validation/validationSchema';
import User from '@/app/models/User';
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        await conectarDB()

        const signUp = await req.json();

        const validation = validationUserSchema.safeParse(signUp)
        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 })
        }

        const { firstName, email, password, lastName } = signUp

        
        const findUser = await User.findOne({email})
        if (findUser) {
            return NextResponse.json({ message: "El email ya existe", status: 409}, { status: 409 })
        }

        const hashPassword = await bcrypt.hash(password, 12)

        const user = await new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            file: ''
        })

        await user.save()

        return NextResponse.json({message: "Usuario registrado correctamente", email: user.email })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Error al Registrarse"}, { status: 400 })
    } 
}