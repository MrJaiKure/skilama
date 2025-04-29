const Project = require("../models/Project");
const User = require("../models/User"); // Import User model

exports.createProject = async (req, res) => {
  const { name } = req.body;

  // Debugging - Log user and project name
  console.log("Creating project for user:", req.user);
  console.log("Project name:", name);

  if (!name) {
    return res.status(400).json({ message: "Project name is required" });
  }

  if (!req.user || !req.user._id) {
    console.log("No user found in request"); // Log for debugging
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const existingProject = await Project.findOne({ name });
    if (existingProject) {
      console.log("Project already exists"); // Log for debugging
      return res.status(400).json({ message: "Project with this name already exists" });
    }

    const project = new Project({
      name,
      user: req.user._id,
    });

    await project.save();
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error("Error creating project:", error); // Log detailed error
    res.status(500).json({ message: "Failed to create project", error: error.message });
  }
};



// Controller to get all projects for the logged-in user
exports.getUserProjects = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Fetch projects for the logged-in user
    const projects = await Project.find({ user: req.user._id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
