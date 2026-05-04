
"use server"

import { DBConnection } from "../utils/config/db"
import { signIn } from "@/auth"

export async function loginAction(loginDetails) {
    await DBConnection()

    try {
        const response = await signIn("credentials", {
            email: loginDetails.email,
            password: loginDetails.password,
            redirect: false,
        })

        if (response?.error) {
            return { success: false, message: response.error }
        }

        return { success: true }

    } catch (error) {
        console.log("LOGIN ERROR:", error)
        return { success: false, message: "Login failed" }
    }
}