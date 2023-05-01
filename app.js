const connectToDatabase = require("./src/database/connect");

connectToDatabase();

require("./modules/express");
require("./src/routes/user.route");
