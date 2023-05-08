const app = require("../../modules/express");
const verifyJWT = require("../../modules/jwt.verify");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/users/user.model");

// GET ALL
app.get("/users", verifyJWT, async (req, res) => {
  try {
    const user = await UserModel.find({});

    return user === null
      ? res.status(404).json(user)
      : res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// GET BY ID
app.get("/users/:id", verifyJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);

    return user === null
      ? res.status(404).json(user)
      : res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// POST
app.post("/users", async (req, res) => {
  try {
    await bcrypt.hash(req.body.password, 10).then((hash) => {
      req.body.password = hash;
    });

    const user = await UserModel.create(req.body);

    return user === null
      ? res.status(400).json(user)
      : res.status(201).header().json(user);
  } catch (error) { 
    return res.status(500).send(error.message);
  }
});

// PUT
app.put("/users/:id", verifyJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

    return user === null ? res.status(400).json(user) : res.status(204);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// PATCH
app.patch("/users/:id", verifyJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

    return user === null
      ? res.status(400).json(user)
      : res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// DELETE
app.delete("/users/:id", verifyJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndRemove(id);

    return user === null
      ? res.status(404).json(user)
      : res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = app;
