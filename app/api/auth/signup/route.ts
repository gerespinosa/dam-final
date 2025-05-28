import User from "@/app/models/User";
import { db } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server"

export async function POST (request: NextRequest){

    // Le paso los siguientes datos, que son los necesarios para crear el usuario
    const {username, password, email} = await request.json()
    console.log("Datos recibidos:", { username, email, password });

    try{

        // Conectamos la base de datos
        await db() 
        // Buscamos un usuario que coincida con el username
        const findUser : User = await User.findOne({email}) as User

        // Cómo no existe el usuario, podemos crearlo
        if(!findUser){

            // Hasheamos la password por seguridad
            (console.log("Vas por aquí"))
            const hashPassword : string = await bcrypt.hash(password, 12)

            // Creanos el nuevo usuario utilizando la password hasheada
            const newUser : User = await User.create({
                username,
                email,
                password: hashPassword // Guardamos en la bd la password ya asegurada con el hash
            })

            // Guardamos el usuario
            const savedUser  = await newUser.save()

            return NextResponse.json({
                status:200,
                user: savedUser
            })


        }else{
            // Si existe el usuario, compararemos las password
            return NextResponse.json({
                status: 200,
                message: "Usuario ya existente en la base de datos"
            })
        }
    } catch (error: any) {
        console.error(" ERROR en creación de usuario:", error.message || error);
        return NextResponse.json({
            status: 500,
            error: error.message || "Unknown error"
        });
    }
}