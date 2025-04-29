import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie for checking token
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Register from './components/Register';

function App() {
  // Check if token exists in cookies
  const token = Cookies.get('token');

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/dashboard" 
          element={token ? <Dashboard /> : <Navigate to="/" replace />} // Redirect to Home if no token
        />
        <Route path="/register" element={<Register />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
