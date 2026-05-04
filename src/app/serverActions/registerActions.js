
"use server";

import {DBConnection} from "../utils/config/db";
import User from "../utils/models/User";

export async function registerAction(registerDetails) {
  try {
    await DBConnection();

    console.log("Register details:", registerDetails);

    if (
      !registerDetails.username ||
      !registerDetails.email ||
      !registerDetails.password
    ) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    const existingUser = await User.findOne({
      email: registerDetails.email,
    });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const user = await User.create({
      username: registerDetails.username,
      email: registerDetails.email,
      password: registerDetails.password,
    });

    return {
      success: true,
      message: "User registered successfully",
      user: JSON.parse(JSON.stringify(user)),
    };
  } catch (error) {
    console.log("Register error:", error.message);
    return {
      success: false,
      message: "Database connection failed",
    };
  }
}