const Task = require("../models/taskModel");
const mongoose = require("mongoose");

// get all tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find({}).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

// create a new task
const createTask = async (req, res) => {
  const { text, isCompleted } = req.body;

  let emptyFields = [];

  if (!text) {
    emptyFields.push("text");
  }
  if (!isCompleted && isCompleted !== false) {
    emptyFields.push("isCompleted");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const task = await Task.create({ text, isCompleted });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a task
const deleteTask = async (req, res) => {
  const { id, deleteCompleted } = req.params;

  if (deleteCompleted === "false") {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such task" });
    }

    const task = await Task.findOneAndDelete({ _id: id });

    if (!task) {
      return res.status(400).json({ error: "No such task" });
    }

    res.status(200).json(task);
  } else {
    const task = await Task.deleteMany({ isCompleted: true });

    if (!task) {
      return res.status(400).json({ error: "No completed tasks" });
    }

    res.status(200).json(task);
  }
};

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such task" });
  }

  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};
