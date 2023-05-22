const express = require("express");
const cors = require("cors");
const linksHATEOAS = require("express-hateoas-links");
const port = 8080;

const app = express();
app.use(express.json(), cors(), linksHATEOAS);

// Middleware
app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers["content-type"]}`);
  console.log(`Token: ${req.headers["x-access-token"]}`);
  console.log(`Date: ${new Date()}`);

  next();
});

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});

module.exports = app;
