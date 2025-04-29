import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });

      // If registration is successful, store token in cookies
      Cookies.set("token", response.data.token, { expires: 1 }); // Token expires in 1 day

      // Redirect to login or home page
      navigate("/"); // Redirect to the login page after successful registration
    } catch (error) {
      setError(error.response ? error.response.data.message : "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-gradient-to-b from-purple-600 to-purple-800 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Create an Account</h1>
        <p className="text-lg mt-4">Join us to supercharge your experience!</p>
      </div>

      <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <img src="/logo.png" alt="Logo" className="h-16 mb-4" />
            <h2 className="text-2xl font-semibold">Register for <span className="text-purple-600">Ques.AI</span></h2>
          </div>

          {/* Registration Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
            </div> */}

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <a href="/" className="text-purple-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
