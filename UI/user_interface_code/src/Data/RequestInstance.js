import HttpClient from "./Network/HttpClient";

function getInstance() {
    return new HttpClient();
}

export default {
    getInstance
};