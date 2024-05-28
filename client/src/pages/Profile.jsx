import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from "../firebase";
import { url } from "../utils/constants";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/slices/userSlice";
const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file])
  
  const handleFileUpload=(file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime()+file.name;
    const storageRef= ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);
    uploadTask.on('state_changed',(snapshot)=>{
      const progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setUploadProgress(Math.round(progress));
    },(error)=>{
      setFileUploadError(true);
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
        setFormData({...formData,avatar:downloadUrl})
      })
    })
  }
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      updateUserStart(true);
      const response = await fetch(`${url}/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        credentials: 'include',
        body:JSON.stringify(formData)
      })
      const data= await response.json();
      if(data.success===false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser= async ()=>{
    try {
      dispatch(deleteUserStart(true));
      const response = await fetch(`${url}/api/user/delete/${currentUser._id}`,
        {
          method:'DELETE',
          headers:{
            'Content-Type':'application/json'
          },
          credentials: 'include',
        }
      );
      const data= await response.json();
      if(data.success===false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message)); 
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e)=>setFile(e.target.files[0])}/>
        <img
          className="rounded-full w-24 h-24 self-center object-cover cursor-pointer"
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : uploadProgress > 0 && uploadProgress < 100 ? (
            <span className='text-slate-700'>{`Uploading ${uploadProgress}%`}</span>
          ) : uploadProgress === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="border p-3 rounded-lg"
          id='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="border p-3 rounded-lg"
          id='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="border p-3 rounded-lg"
          id='password'
          defaultValue={currentUser.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 hover:opacity-90 p-3 rounded-md text-white uppercase disabled:opacity-80"
        >
          {loading?'Loading':'Update'}
        </button>
      </form>
      <p className="text-red-700">{error?error:''}</p>
      <p className="text-green-700">{updateSuccess?'Profile Updated Successfully':''}</p>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 hover:opacity-90 p-3" onClick={handleDeleteUser}>Delete Account</span>
        <span className="text-red-700 hover:opacity-90 p-3">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
