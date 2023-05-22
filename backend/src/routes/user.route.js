const app = require("../../modules/express");
const verifyJWT = require("../../modules/jwt.verify");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/users/user.model");
const linksHATEOAS = require("../links/links.hateoas");

const authToken = verifyJWT.verifyJWT;

// GET ALL
app.get("/users", authToken, async (req, res) => {
  try {
    const user = await UserModel.find({});

    if (user != null) user.password = "";

    return user === null
      ? res.status(404).json(user)
      : res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// GET BY ID
app.get("/users/:id", authToken, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    const hateoas = linksHATEOAS("users", id);

    if (user != null) user.password = "";

    return user === null
      ? res.status(404).json(user)
      : res.status(200).json(user, hateoas);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// POST: Register
app.post("/users", async (req, res) => {
  try {
    await bcrypt.hash(req.body.password, 10).then((hash) => {
      req.body.password = hash;
    });

    const user = await UserModel.create(req.body);
    const id = user._id.toString();
    const hateoas = linksHATEOAS("users", id);

    if (user != null) user.password = "";

    return user === null
      ? res.status(400).json(user)
      : res.status(201).header().json(user, hateoas);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// PUT
app.put("/users/:id", authToken, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    const hateoas = linksHATEOAS("users", id);

    if (user != null) user.password = "";

    return user === null
      ? res.status(400)
      : res.status(200).json(user, hateoas);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// PATCH
app.patch("/users/:id", authToken, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    const hateoas = linksHATEOAS("users", id);

    if (user != null) user.password = "";

    return user === null
      ? res.status(400).json(user)
      : res.status(200).json(user, hateoas);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// DELETE
app.delete("/users/:id", authToken, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete(id);

    return user === null
      ? res.status(404).json(null)
      : res.status(204).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = app;
