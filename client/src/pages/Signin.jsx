import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/slices/userSlice';

const Signin = () => {
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch(`${url}/api/auth/signin`,{
        method:'POST',
        credentials: 'include',
        headers:{
          'Content-Type':'application/json',
          'Accept': 'application/json',
        },
        body:JSON.stringify(formData)
      })
      const data= await response.json();
      if(data.success===false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure("Something went wrong"));
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl  my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='Email' name='email' className='border p-3 rounded-md' onChange={handleChange}/>
        <input type="password" placeholder='Password' name='password' className='border p-3 rounded-md' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 hover:opacity-90 p-3 rounded-md text-white uppercase disabled:opacity-80'>Sign In</button>
      </form>
      <div className='flex gap-2 mt-3'>
        <p>Don't have an account?</p>
        <Link to={'/sign-up'}><span className='text-blue-700'> Sign Up</span></Link>
      </div>
      {error?<p className='text-red-500 mt-5'>{error}</p>:<></>}
    </div>
  )
}

export default Signin;