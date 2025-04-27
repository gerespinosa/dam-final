import User from "@/app/(auth)/(models)/User";
import { db } from "@/app/(database)/db";
import { NextResponse, NextRequest } from "next/server"

export async function POST (request: NextRequest){

    // Le paso los siguientes datos, que son los necesarios para el login
    const {username, password} = await request.json()

    try{

        // Conectamos la base de datos
        await db() 
        // Buscamos un usuario que coincida con el username
        const findUser : User = await User.findOne({username}) as User

        // Si no existe el usuario, retornamos un 404
        if(!findUser){
            return NextResponse.json({
                status: 404,
                message: "Usuario no encontrado"
            })
        }else{
            // Si existe el usuario, compararemos las password
            return NextResponse.json({
                status: 200,
                user: findUser
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