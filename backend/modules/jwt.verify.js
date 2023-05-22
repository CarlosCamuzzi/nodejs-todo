const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

 // console.log("--> " + token);

  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    }

    req.userId = decoded.id;

    next();
  });
};

// tests
// const generateJWT = (user) => {
//   user.forEach((user) => {
//     const id = user.id;
//     const token = jwt.sign({ id }, process.env.SECRET, {
//       expiresIn: 6000,
//     });

//     return token;
//   });
// };

module.exports = { verifyJWT };
