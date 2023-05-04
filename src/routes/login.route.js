const app = require("../../modules/express");
const UserModel = require("../models/users/user.model");
const jwt = require("jsonwebtoken");

// LOGIN
app.post("/users/login", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const user = await UserModel.find({
      email: userEmail,
      password: userPassword,
    });

    //console.log(user[0]);

    if (user[0] === undefined) {
      console.log("Não foi possível logar, usuário não encontrado");
      return res.status(404).json(user);
    } else {
      console.log("Usuário encontrado.");
      user.forEach((user) => {
        const id = user.id;
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 300,
        });

        console.log(token);
        return res.status(200).json({ auth: true, token: token });
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

// https://github.com/auth0/node-jsonwebtoken
// https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/

// http://artedosdados.blogspot.com/2013/07/rodando-scripts-que-contem-comandos-do.html

//https://www.mongodb.com/docs/mongodb-shell/crud/read/

//  db.users.find({email:'carl@mail.com', password: '123456'}) and
