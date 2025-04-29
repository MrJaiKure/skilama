const Project = require("../models/Project");
const User = require("../models/User"); // Import User model

exports.createProject = async (req, res) => {
  const { name, userId } = req.body;

  console.log("Creating project for user ID:", userId);
  console.log("Project name:", name);

  if (!name || !userId) {
    return res.status(400).json({ message: "Project name and user ID are required" });
  }

  try {
    const existingProject = await Project.findOne({ name });
    if (existingProject) {
      return res.status(400).json({ message: "Project with this name already exists" });
    }

    // Create new project
    const project = new Project({
      name,
      user: userId,
    });

    await project.save();

    // Add project reference to user's `projects` array
    await User.findByIdAndUpdate(userId, {
      $push: { projects: project._id },
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error("Error creating project:", error);
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
