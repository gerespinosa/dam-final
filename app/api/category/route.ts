import { db } from "@/app/lib/db";
import Category from "@/app/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest){
    const body = await req.json()
    const {name, shownName, url} = body

    try{
        await db()
        const newCategory = new Category({
            name: name,
            shownName: shownName,
            url: url
        })

        const savedCategory = await newCategory.save()
     return NextResponse.json({
  savedCategory: {
    name: savedCategory.name,
    shownName: savedCategory.shownName,
    url: savedCategory.url
  }
});
    }catch(error: any){
        return NextResponse.json({
            error
        })
    }
}

export async function DELETE (req: NextRequest){
    const body = await req.json()
    const { name } = body
    try {
        await db();
        const deletedCategory = await Category.findOneAndDelete({ name });
        if (!deletedCategory) {
            return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 });
        }
        return NextResponse.json({ message: `Categoría '${name}' eliminada con éxito` });
    } catch(error: any) {
        return NextResponse.json({ error: error.message || error }, { status: 500 });
    }
}

export async function GET (req: NextRequest){
        try {
        await db();
        const categories = await Category.find();
        if (!categories) {
            return NextResponse.json({ error: 'Categorías no encontrada' }, { status: 404 });
        }   
        return NextResponse.json({categories});
    } catch(error: any) {
        return NextResponse.json({ error: error.message || error }, { status: 500 });
    }
}