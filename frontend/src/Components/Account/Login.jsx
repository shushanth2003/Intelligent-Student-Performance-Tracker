import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginimg from '../Loginimage/loginimg.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6969/api/login', formData);
      if (response.status === 200) {
        const username = response.data.user?.username; // Username eduthukuren
        if (!username) throw new Error("Username not found in response");
        localStorage.setItem('username', username); // Username save pannuren
        console.log("Get the username from a database:", username);
        setMessage('Login successful!');
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setMessage(error.response.data.message || 'Invalid email or password.');
        } else if (error.response.status === 500) {
          setMessage('Server error, please try again later.');
        }
      } else {
        setMessage('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex gap-5 w-[800px]">
        <div className="w-1/2 flex justify-center items-center">
          <img src={loginimg} alt="Login" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className="bg-white shadow-md p-6 rounded-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Login</h2>
            {message && <p className="text-center text-red-500 mb-4">{message}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col">
                <label htmlFor="email" className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-white w-fit">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email..."
                  className="border-gray-300 px-3 py-2 text-sm bg-gray-100 border rounded-md w-full focus:outline-none placeholder:text-black/25"
                  required
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="password" className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-white w-fit">
                  Password:
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password..."
                  className="border-gray-300 px-3 py-2 text-sm bg-gray-100 border rounded-md w-full focus:outline-none placeholder:text-black/25"
                  required
                />
              </div>
              <div className="flex justify-between text-xs text-blue-500 mb-4">
                <a href="#" className="hover:underline">Forgot Password?</a>
                <Link to="/register">Don't have an account?</Link>
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
  
  
