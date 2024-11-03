const axios = require("axios");
const NETWORK_CONFIG = require("./NetworkConfig");

class HttpClient {
    constructor() {
        this._API_URL = NETWORK_CONFIG.API_ENDPOINT;
    }
    
    getData = async (endpoint) => {
        try {
            const response = await axios.get(`${this.API_URL}/${endpoint}`);
            console.log('GET Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    // Function to perform a POST request
    postData = async (endpoint, data) => {
        try {
            const response = await axios.post(`${this.API_URL}/${endpoint}`, data);
            console.log('POST Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    // Function to perform a PUT request
    putData = async (endpoint, data) => {
        try {
            const response = await axios.put(`${this.API_URL}/${endpoint}`, data);
            console.log('PUT Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    
    // Function to perform a DELETE request
    deleteData = async (endpoint) => {
        try {
            const response = await axios.delete(`${this.API_URL}/${endpoint}`);
            console.log('DELETE Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };   
}

module.exports = HttpClient;