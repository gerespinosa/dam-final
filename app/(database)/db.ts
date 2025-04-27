import mongoose from "mongoose";

// Creamos la conexión con la base de datos

const uri : string = process.env.MONGODB_URI  as string

export async function db () {
    try {
        await mongoose.connect(uri, {
            dbName: "damfinal"
        })
        console.log("Conexión con MongoDB correcta")
    } catch (error) {
        console.log(error)
    }
} 