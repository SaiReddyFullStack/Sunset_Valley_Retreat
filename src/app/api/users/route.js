
// All User details mongodb


import {DBConnection} from "@/app/utils/config/db";
import User from "@/app/utils/models/User";
import { NextResponse } from "next/server";

// name,user,password use it
export async function GET(){
    await DBConnection()

   
    try {   // records fetch it here     // hide it admin and password
        const users = await User.find({role:{$ne:'admin'}},{password:0})
        if(!users){
            return NextResponse.json({success:false, message:"No user"},{status:404})
        }
        return NextResponse.json({success:true, users}, {status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false,message:"failed to get users"},{status:500})
    }
}