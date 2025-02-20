import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';  // Ensure this imports the CSS with the styles

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/register', { username, password });
            alert('Registration successful');
            navigate('/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
      <section className="py-10 bg-gradient-to-r from-fuchsia-600 to-blue-600 sm:py-16 lg:py-24">
                  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                      <div className="max-w-2xl mx-auto text-center">
                          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Register</h2>
                          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-white">Welcome back! Please sign Up to Get more features</p>
                      </div>
      
                      <div className="max-w-md mx-auto mt-12 overflow-hidden bg-white rounded-md shadow-md lg:mt-20">
                          <div className="p-6 sm:p-10">
                              <h3 className="text-2xl font-semibold text-black">Sing up to access your account</h3>
      
                              <form onSubmit={handleRegister} className="mt-8">
                                  <div className="space-y-5">
                                      <div>
                                          <label htmlFor="username" className="text-base font-medium text-gray-900">Username</label>
                                          <div className="mt-2.5 relative">
                                              <input
                                                  type="text"
                                                  id="username"
                                                  placeholder="Enter your username"
                                                  value={username}
                                                  onChange={(e) => setUsername(e.target.value)}
                                                  className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                              />
                                          </div>
                                      </div>
      
                                      <div>
                                          <label htmlFor="password" className="text-base font-medium text-gray-900">Password</label>
                                          <div className="mt-2.5 relative">
                                              <input
                                                  type="password"
                                                  id="password"
                                                  placeholder="Enter your password"
                                                  value={password}
                                                  onChange={(e) => setPassword(e.target.value)}
                                                  className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                              />
                                          </div>
                                      </div>
      
                                      <div>
                                          <button
                                              type="submit"
                                              className="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                                          >
                                              Sign Up
                                          </button>
                                      </div>
                                  </div>
                              </form>
      
                              <div className="mt-5 text-center">
                                  <p className="text-base text-gray-600">
                                      Already registered?{" "}
                                      <Link
                                          to="/login"
                                          className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
                                      >
                                          login here
                                      </Link>
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
    );
};

export default Register;
