
import { instance } from "../lib/axios";

export async function getCategories(){
    try{
        const response = await instance.get("/category")
        return response.data.categories
    }catch(error: any){
        console.log("Imposible recuperar las categorías")
        return null
    }
}