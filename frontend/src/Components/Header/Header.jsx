import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../Loginimage/images/Logo.png';

const Header = () => {
  // Direct-a localStorage-la irunthu username eduthu state initialize pannu
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: If localStorage changes elsewhere, this will update
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
    navigate('/login');
  };

  return (
    <header>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <img src={Logo} alt="Your Logo" className="h-15 w-auto object-contain" />
        <nav>
          <ul className="flex space-x-8 text-lg font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-blue-600 transition ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-700'}`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student"
                className={({ isActive }) =>
                  `hover:text-blue-600 transition ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-700'}`
                }
              >
                Student
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analysis"
                className={({ isActive }) =>
                  `hover:text-blue-600 transition ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-700'}`
                }
              >
                Analysis
              </NavLink>
            </li>
            <li>
              {username ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome, {username}</span>
                  <button onClick={handleLogout} className="text-blue-500 hover:underline">
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `hover:text-blue-600 transition ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-700'}`
                  }
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;