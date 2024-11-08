const { parsed } = require('dotenv').config();
const application = require("./src/app");
const CONFIG = parsed;

console.log(CONFIG);
application();