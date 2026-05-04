
// Data get route here.
// ADdproduct data send into mongodb 
// routes dara send mongodb
// post method dara api  create.

// import { DBConnection } from "@/app/utils/config/db";
import {DBConnection} from "@/app/utils/config/db";
import { NextResponse } from "next/server";
import {writeFile} from 'fs/promises';
import path from 'path';  // images ni folder create chesi and save it. use path.
import ProductModel from "@/app/utils/models/Product";

export async function GET(){
    await DBConnection()

    // MDB products Record get productmodel.
    const records = await ProductModel.find({})
    return NextResponse.json({data:records})
   
}

// Addproducts  data ni ex.title,price     store in MDB
export async function POST(request){
    await DBConnection();

    const data = await request.formData()
    const title = data.get('title');
    const price = data.get('price');
    const offer = data.get('offer');
    const amen = data.get('amen');
    const desc = data.get('desc');
    const image = data.get('image');

    const bufferData = await image.arrayBuffer(); // image
    const buffer  = Buffer.from(bufferData);// image
    const imagePath = path.join(process.cwd(),'public','uploads',image.name)// image

    try {
        await writeFile(imagePath,buffer); // 2 arguments take it.
        const newProduct = new ProductModel({
            title:title,
            price:price,
            offer:offer,
            amen:amen,
            desc:desc,
            image:`/uploads/${image.name}`  //foldername,imagename
        })

        await newProduct.save()    // database save it
        return NextResponse.json({response:'successfully uploaded',success:true},
            {status:201}
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false},{status:500})
    }

}