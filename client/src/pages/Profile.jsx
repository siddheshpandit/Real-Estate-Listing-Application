import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="rounded-full w-24 h-24 self-center object-cover cursor-pointer"
          src="https://www.w3schools.com/w3images/avatar2.png"
          alt="profile"
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="border p-3 rounded-lg"
          id='username'
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="border p-3 rounded-lg"
          id='email'
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="border p-3 rounded-lg"
          id='password'
        />
        <button
          disabled={loading}
          className="bg-slate-700 hover:opacity-90 p-3 rounded-md text-white uppercase disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 hover:opacity-90 p-3">Delete Account</span>
        <span className="text-red-700 hover:opacity-90 p-3">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
