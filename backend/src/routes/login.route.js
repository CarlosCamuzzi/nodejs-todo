const app = require("../../modules/express");
const UserModel = require("../models/users/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN
app.post("/users/login", async (req, res) => {
  try {
    const userEmailBody = req.body.email;
    const userPasswordBody = req.body.password;

    const user = await UserModel.find({
      email: userEmailBody,
      //password: userPassword,
    });

    if (user[0] === undefined) {
      console.log("Unable to login, user not found");
      return res.status(404).json(user);
    } else {
      // Compare password body and database
      bcrypt.compare(userPasswordBody, user[0].password).then((result) => {
        // console.log(result);
        if (!result) {
          return res.status(404).json({ Message: "Password Invalid" });
        }
        console.log("Login ok, user found");
        user.forEach((user) => {
          const id = user.id;
          const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 6000,
          });

          //console.log(token);
          return res.status(200).json({ auth: true, token: token });
        });
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// LOGOUT
app.post("/users/logout", (req, res) => {
  res.status(200).json({ auth: false, token: null });
});

module.exports = app;
