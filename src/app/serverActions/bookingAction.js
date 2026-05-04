
"use server"
// serveraction dara values ni pass it
import { auth } from "@/auth";
import {DBConnection} from "../utils/config/db";
import BookingModel from "../utils/models/Bookings";
import User from "../utils/models/User";

export async function bookingAction(bookingDetails){

    const session = await auth() // session lo email are their / auth undi session details come it.
    console.log(session.user.email);
    
   try {
    await DBConnection()
    console.log(bookingDetails);
    // email based on userId ni get it
    const user = await User.findOne({
            email:session.user.email      
    })
    if(!user){
        return {success:false,message:"User not Found"}
    }
    //   database lo unqiue id converted into string
    const userId = user._id.toString() // id converted into string.

    const userBookingDetails = await BookingModel.create({  // bookings values records send it MDB.
        startDate: bookingDetails.selectedDates.startDate,
        endDate  : bookingDetails.selectedDates.endDate,
        productName:bookingDetails.record.title,
        price    : bookingDetails.record.price,
        offer    : bookingDetails.record.offer,
        image     : bookingDetails.record.image,
    })

    // bookings push into USERMODEL
    await User.findByIdAndUpdate(   // bookingmodels add it and update it.
        userId,
        {$push:{bookings:userBookingDetails._id}},
        {new:true} // record update true
    )
    return {success:true}

   } catch (error) {
    console.log(error);
    return {success:false, message:'failed to create booking'}
   }
}


