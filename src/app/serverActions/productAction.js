
"use server"

import {DBConnection} from "../utils/config/db";

export async function productAction(recordDetails){
    await DBConnection()
    console.log(recordDetails);
  
}