import React from 'react'
import {Link} from 'react-router-dom'
const Signup = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl  my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' className='border p-3 rounded-md'/>
        <input type="email" placeholder='Email' className='border p-3 rounded-md'/>
        <input type="password" placeholder='Password' className='border p-3 rounded-md'/>
        <button className='bg-slate-700 hover:opacity-90 p-3 rounded-md text-white uppercase disabled:opacity-80'>Sign up</button>
      </form>
      <div className='flex gap-2 mt-3'>
        <p>Have an account?</p>
        <Link to={'/signin'}><span className='text-blue-700'> Sign In</span></Link>
      </div>
    </div>
  )
}

export default Signup