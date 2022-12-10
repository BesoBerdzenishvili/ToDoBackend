const express = require("express");
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

const router = express.Router();

// GET all tasks
router.get("/", getTasks);

// POST a new task
router.post("/", createTask);

// DELETE a task
router.delete("/:id", deleteTask);

// UPDATE a task
router.patch("/:id", updateTask);

module.exports = router;
