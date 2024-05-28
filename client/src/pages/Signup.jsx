import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { url } from '../utils/constants';

const Signup = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=async (e)=>{
    try {
      setLoading(true);
      e.preventDefault();
      const response = await fetch(`${url}/api/auth/signup`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data= await response.json();
      if(data.success===false){
        setError(data.errMessage);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(false);
      navigate('/signin')
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Something went wrong");
    }
  }

  // console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl  my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' name='username' className='border p-3 rounded-md' onChange={handleChange}/>
        <input type="email" placeholder='Email' name='email' className='border p-3 rounded-md' onChange={handleChange}/>
        <input type="password" placeholder='Password' name='password' className='border p-3 rounded-md' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 hover:opacity-90 p-3 rounded-md text-white uppercase disabled:opacity-80'>Sign up</button>
      </form>
      <div className='flex gap-2 mt-3'>
        <p>Have an account?</p>
        <Link to={'/signin'}><span className='text-blue-700'> Sign In</span></Link>
      </div>
      {error?<p className='text-red-500'>{error}</p>:<></>}
    </div>
  )
}

export default Signup