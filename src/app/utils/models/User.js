
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }, 
    role:{
        type:String,
        default:"user"
    },
    bookings:[{                                         // relation bookings model
        type:mongoose.Schema.Types.ObjectId,
        ref:'bookings'
    }]    
}, { timestamps: true },
);

const User = mongoose.models.user || mongoose.model("user", userSchema) // record name create user

export default User;