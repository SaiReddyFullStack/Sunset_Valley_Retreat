
"use client";

import React, { useState,useEffect } from 'react'
import { registerAction } from '../serverActions/registerActions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

 export default function RegisterForm ()  {

  const router = useRouter()

    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")

     const [mounted, setMounted] = useState(false);
     
        useEffect(() => {
        setMounted(true);
           }, []);
     if (!mounted) return null;   // or return a loader
   

    const registerHandler = async(e)=>{
        e.preventDefault()
       
        const userRegisterDetails = {username,email,password}
        console.log(userRegisterDetails);

        try {
         const response =  await registerAction(userRegisterDetails)
         if(response.success){
          alert("Register success")
          router.push('/login')            // user push login.
         }
        } catch (error) {
          console.log(error);
          
        }
    }

  return (
    <>
    <div className='formContainer'>
      <h1>Register Form</h1>

      
       <form onSubmit={ registerHandler} className='formSection'>
        <h3>Username</h3>
        <input type="text" name="username" onChange={(e)=>setUserName(e.target.value)}/>
        <h3>Password</h3>
        <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
         <h3>Email</h3>
        <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)}/>
        <br/>
        <button type='submit' style={{ fontSize: "18px" }}>Register</button>
       </form> <br/>
       {/* user noLogin go to login */}
       {/* Redirect login page */}
      <Link href="/login"  style={{ color: "black", textDecoration: "none", fontSize: '15px' }}>
        Already Registered? <span style={{ color: "#2563eb", fontSize: '17px' }}> Login</span>
      </Link>
    </div>

   <div className="footer">
      <p>&copy; 2026 SaiReddy Studio. All rights reserved</p>
    </div>

</>
  )
}


