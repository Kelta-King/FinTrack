const HttpClient = require("./Network/HttpClient");

function getInstance() {
    return new HttpClient();
}

module.exports = getInstance;