import User from "@/app/models/User";
import { db } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server"

export async function POST (request: NextRequest){

    // Le paso los siguientes datos, que son los necesarios para crear el usuario
    const {username, password, email} = await request.json()

    try{

        // Conectamos la base de datos
        await db() 
        // Buscamos un usuario que coincida con el username
        const findUser : User = await User.findOne({email}) as User

        // Cómo no existe el usuario, podemos crearlo
        if(!findUser){

            // Hasheamos la password por seguridad
            const hashPassword : string = await bcrypt.hash(password, 12)

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
    }catch (error){
        // En caso de error, nos devuelve el error
        return NextResponse.json({
            status: 500,
            error: error
        })
    }
}