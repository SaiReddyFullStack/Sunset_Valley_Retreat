
"use client"

import React, { useState } from 'react'
import { loginAction } from '../serverActions/loginActions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const UserLogin = () => {
  
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    // error ki usestate
    const [error,setError] = useState("")    

    const router = useRouter()

    const loginHandler = async(e)=>{
        e.preventDefault()

        const loginDetails = {email,password}
        console.log(loginDetails);
        
        try {
            const response = await loginAction(loginDetails)
            if(response.success){
                router.push('/')
            }else{
                setError(response.message || 'login failed')
            }
        } catch (error) {
            console.log(error.message);    
        }
    }

  return (
    <div className='formContainer'>
      <h1>Login Form</h1>
     
        <form onSubmit={loginHandler} className='formSection'>
            {error && <p style={{color:'red'}}>{error}</p>}
         <h3>Email</h3>
        <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)}/>
          <h3>Password</h3>
        <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
        <br/>
        <button type='submit' style={{ fontSize: "18px" }}>Login</button>
       </form><br/>
       {/* Redirect register page */}
         <Link href="/register"  style={{ color: "black", textDecoration: "none", fontSize: '15px' }}>
         Not Registered? <span style={{color:"#2563eb",  fontSize: '15px'}}>Register</span>
       </Link>
    </div>
  )
}

export default UserLogin
