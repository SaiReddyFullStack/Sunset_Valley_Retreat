
// individual products ID get it.
// individual products ID

import {DBConnection} from "@/app/utils/config/db";
import ProductModel from "@/app/utils/models/Product";
import { NextResponse } from "next/server";

// Dynamic id get it
// individual products ID get it.
export async function GET(request,{params}){
    await DBConnection()

  //return NextResponse.json({ ok: true, route: "product" })
    const {id} = await params;
    console.log(id);
    
    
    try {
        if(!id){
            return NextResponse.json({success:false,message:"No product Found"},{status:404});
        }

        const product = await ProductModel.findById(id)
         if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: product
        });
        return NextResponse.json({success:true,data:product})

    } catch (error) {
        console.log(error);
         return NextResponse.json({success:false,message:'Product ID is missing'})
    }
}
