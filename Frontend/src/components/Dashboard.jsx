import React, { useState } from "react";
import { FaCog, FaBell,FaSignOutAlt  } from "react-icons/fa"; // Using react-icons for setting and notification icons
import axios from "axios"; // Import axios for making HTTP requests
import Cookies from "js-cookie";
// Modal Component
const CreateProjectModal = ({ isOpen, onClose, onCreateProject }) => {
  const [projectName, setProjectName] = useState("");

 

  const handleCreateProject = async () => {
    if (projectName) {
      try {
        // Check if token exists
        const token = Cookies.get("token");
        console.log(projectName)
        console.log(token)
        if (!token) {
          alert("No token found. Please log in.");
          return;
        }
  
        // Send POST request with data
        const response = await axios.post(
          "http://localhost:5000/api/project/create", // Backend URL
          { name: projectName }, // Data being sent
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to Authorization header
            },
          }
        );
  
        console.log("Response:", response.data); // Check what you get from backend
        onCreateProject(response.data.project); // Pass project data to parent
        onClose(); // Close modal
      } catch (error) {
        console.error("Error creating project:", error);
        alert("Failed to create project. Please try again.");
      }
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          className="w-full p-3 border rounded-md mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateProject}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const handleLogout = () => {
    // Clear the token from cookies
    // Cookies.remove('token');
    Cookies.remove('token', { path: '/' }); 

    
    // Redirect the user to the login page (home route)
    window.location.href = '/'; // This will redirect to the home page (login page)
  };

  // Function to handle the creation of a project
  const handleCreateProject = (project) => {
    setProjects([...projects, project]); // Update the projects list with the new project
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <div className="flex justify-between items-center p-4 bg-purple-600 text-white">
        {/* Logo on the left */}
        <div className="text-2xl font-bold">MyLogo</div>

        {/* Icons on the right (settings and notifications) */}
        <div className="flex space-x-4">
          <FaCog className="text-2xl cursor-pointer hover:text-gray-200" />
          <FaBell className="text-2xl cursor-pointer hover:text-gray-200" />
          <FaSignOutAlt
            className="text-2xl cursor-pointer hover:text-gray-200"
            onClick={handleLogout} // Trigger the logout function on click
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-semibold mb-4">Create New Project</h1>
        <p className="text-center max-w-2xl px-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
          sapiente sed veritatis illum necessitatibus. Iste sed, mollitia eius
          excepturi, eum consequatur fugiat cupiditate dignissimos saepe tempora
          quod perspiciatis perferendis quibusdam?
        </p>
        <button
          onClick={() => setIsModalOpen(true)} // Open modal on button click
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          Create New Project
        </button>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal
        onCreateProject={handleCreateProject} // Pass the handler to modal
      />

      {/* Display list of projects (Optional) */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold">My Projects</h2>
        <ul className="space-y-4 mt-4">
          {projects.map((project) => (
            <li key={project._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl">{project.name}</h3>
              <p>Created at: {new Date(project.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
