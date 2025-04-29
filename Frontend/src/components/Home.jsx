import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      console.log(response)

      // Store the JWT token in cookies
      Cookies.set('token', response.data.token); // The token will expire in 1 day

      // Redirect to the dashboard after successful login
      navigate('/dashboard'); // Change the path to your desired route
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <div className="flex min-h-screen">
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-b from-purple-600 to-purple-800 text-white flex flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-bold mb-4">Your podcast<br />will no longer<br />be just a hobby.</h1>
          <p className="text-lg mt-4">Supercharge Your Distribution<br />using our AI assistant!</p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-8">
          <div className="w-full max-w-md">
            {/* Logo and Welcome */}
            <div className="flex flex-col items-center mb-8">
              <img src="/logo.png" alt="Logo" className="h-16 mb-4" />
              <h2 className="text-2xl font-semibold">Welcome to <span className="text-purple-600">Ques.AI</span></h2>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-purple-600 hover:underline">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition"
              >
                Login
              </button>
            </form>

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-4 text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}

            {/* Or Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full border border-gray-300 py-3 rounded-md flex items-center justify-center hover:bg-gray-200 transition"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="h-5 w-5 mr-3"
              />
              Continue with Google
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{' '}
              <a href="/register" className="text-purple-600 hover:underline">
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
