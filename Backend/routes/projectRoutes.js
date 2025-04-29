const express = require("express");
const router = express.Router();
const { createProject, getUserProjects } = require("../controllers/projectController");
const { authenticateUser } = require("../middleware/authMiddleware");


router.post("/create",  createProject);
router.get("/",  getUserProjects); // Fetch user-specific projects

module.exports = router;
