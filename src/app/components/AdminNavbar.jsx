
import React from 'react'
import Link from 'next/link'

// admin page navbar create it
const AdminNavbar = () => {
  return (
    <div>
      <div className='navSection'>
        <div className='title'>
           <h1>Sunset Valley Retreat</h1>
        </div>
{/*                static */}
        <p>Welcome:Admin</p>
        <Link href="/api/auth/signout" className='link'>
        <div className='logout'>
            Logout
        </div>
        </Link>
        
      </div>
    </div>
  )
}

export default AdminNavbar
