

"use client"

import React from 'react'
import Link from 'next/link'

const UserNavigation = ({userName}) => {
  return (
    <div className='navSection'>
    <div className="title">
       
      <Link href="/" className="link"  style={{ textDecoration: "none", color: 'black' }}>
       <h1>Sunset Valley Retreat</h1>
      </Link> 
    </div>
   
    <div className="contact">
        Call now : 86 88 47 02 95
    </div>

     <Link href="/invoice" className='link'  style={{ textDecoration: "none", color: 'black' }}>
    <div className="bookings">
      Bookings :  
    </div>
    </Link> 

    <p>Welcome :  
      <span style={{color:'#2563eb', marginLeft:'5px', fontSize:'30px', border:'none'}}>
     {userName}
      </span>
       </p>

    <Link href="/api/auth/signout" className='link' style={{ textDecoration: "none", color: "black" }}>
    <div className="logout">
        Logout
    </div>
    </Link>

</div>
  )
}

export default UserNavigation
