const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/connect");

dotenv.config();

connectToDatabase();

require("./modules/express");
require("./src/routes/login.route");
require("./src/routes/user.route");
