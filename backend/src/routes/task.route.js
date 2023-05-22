const app = require("../../modules/express");
const verifyJWT = require("../../modules/jwt.verify");
const TaskModel = require("../models/tasks/task.model");

const authToken = verifyJWT.verifyJWT;

// GET ALL
app.get("/tasks", authToken, async (req, res) => {
  try {
    // Get User
    const task = await TaskModel.find({});

    return task === null
      ? res.status(404).json(task)
      : res.status(200).json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET BY ID
app.get("/tasks/:id", authToken, async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findById(id);

    return task === null
      ? res.status(404).json(task)
      : res.status(200).json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST
app.post("/tasks", authToken, async (req, res) => {
  try {
    const date = new Date();
    req.body.createdDate = new Date();
    const task = await TaskModel.create(req.body);

    return task === null
      ? res.status(400).json(task)
      : res.status(201).json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT - Problem
app.put("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findByIdAndUpdate(id, req.body, { new: true });

    return task === null ? res.status(404).json(task) : res.status(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PATCH
app.patch("/tasks/:id", authToken, async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findByIdAndUpdate(id, req.body, { new: true });
    console.log("TASK HERE:" + task);

    return task === null ? res.status(404).json(task) : res.status(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE
app.delete("/tasks/:id", authToken, async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findByIdAndRemove(id);

    return task === null ? res.status(404).json(task) : res.status(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = app;
