import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import registerImg from '../Loginimage/loginimg.jpg';

const Createaccount = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6969/api/register', formData);
      // Backend response structure based on your backend code
      if (response.status === 201) {
        setMessage('Account created successfully!');
      }
    } catch (error) {
      // Handle errors based on backend response
      if (error.response) {
        if (error.response.status === 400) {
          setMessage(error.response.data.message || 'Account already exists.');
        } else if (error.response.status === 500) {
          setMessage('Server error, please try again later.');
        }
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[800px] h-[500px]">
        <div className="w-1/2 hidden md:block">
          <img src={registerImg} alt="Register" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create Account</h2>
          {message && <p className="text-center text-red-500 mb-4">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 flex flex-col">
              <label className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-white w-fit">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username..."
                className="border-blue-500 px-[10px] py-[11px] text-xs bg-gray-200 border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25"
                required
              />
            </div>
            <div className="mb-3 flex flex-col">
              <label className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-white w-fit">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email..."
                className="border-blue-500 px-[10px] py-[11px] text-xs bg-gray-200 border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25"
                required
              />
            </div>
            <div className="mb-3 flex flex-col">
              <label className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-white w-fit">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password..."
                className="border-blue-500 px-[10px] py-[11px] text-xs bg-gray-200 border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600 transition">
              Sign Up
            </button>
          </form>
          <p className="text-xs text-center mt-3">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Createaccount;