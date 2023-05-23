const app = require("../../modules/express");
const verifyJWT = require("../../modules/jwt.verify");
const TaskModel = require("../models/tasks/task.model");
const linksHATEOAS = require("../links/links.hateoas");

const authToken = verifyJWT;

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
    const hateoas = linksHATEOAS("tasks", id);

    return task === null
      ? res.status(404).json(task)
      : res.status(200).json(task, hateoas);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST
app.post("/tasks", authToken, async (req, res) => {
  try {
    req.body.createdDate = new Date();
    const task = await TaskModel.create(req.body);
    const id = task._id.toString();
    const hateoas = linksHATEOAS("users", id);

    return task === null
      ? res.status(400).json(null)
      : res.status(201).json(task, hateoas);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT
app.put("/tasks/:id", authToken, async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findByIdAndUpdate(id, req.body, { new: true });
    const hateoas = linksHATEOAS("tasks", id);

    return task === null
      ? res.status(404).json(null)
      : res.status(200).json(task, hateoas);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PATCH
app.patch("/tasks/:id", authToken, async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findByIdAndUpdate(id, req.body, { new: true });
    const hateoas = linksHATEOAS("tasks", id);

    return task === null
      ? res.status(404).json(null)
      : res.status(200).json(task, hateoas);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE
app.delete("/tasks/:id", authToken, async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findByIdAndRemove(id);

    return task === null
      ? res.status(404).json(null)
      : res.status(200).json({ Message: "User deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = app;
