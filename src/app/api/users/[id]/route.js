

// Individual userId [get] dara it
// individual users fetch Id get it.
// individual Id get it/ fetch it.
// dynamic id

import {DBConnection} from "@/app/utils/config/db";
import User from "@/app/utils/models/User";
import BookingModel from "@/app/utils/models/Bookings";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    await DBConnection()

    const {id} = params
    console.log(id);
    
    try {
        if(!id){
            return NextResponse.json({success:false,message:"No user Found"},{status:404})
        }
//                                          bookingActions lo bookings
        const user = await User.findById(id).populate('bookings')
        return NextResponse.json({success:true,data:user})
        
    } catch (error) {
        console.log(error);
         return NextResponse.json({success:false,message:'User ID is missing'})
    }
}