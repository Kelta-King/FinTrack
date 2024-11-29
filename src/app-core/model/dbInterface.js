const db = require("./JsonDB/jsonDB");

const getDBInstance = () => {
    return db;
}

module.exports = getDBInstance;