import axios from 'axios';
import NETWORK_CONFIG from './NetworkConfig';

class HttpClient {
    constructor() {
        this._API_URL = NETWORK_CONFIG.API_ENDPOINT;
    }
    
    getData = async (endpoint) => {
        var ret = {};
        try {
            console.log(`${this._API_URL}/${endpoint}`);
            const response = await axios.get(`${this._API_URL}/${endpoint}`);
            if(response.status == 200) {
                ret.success = true;
                ret.message = "Data fetched successfully";
                ret = response.data;
            }
            else {
                ret.success = false;
                ret.message = `Error fetching data: Server responded with status ${response.status}`;
                ret.data = null;
            }
        } 
        catch (error) {
            console.error('Error fetching data:', error);
            ret.success = false;
            ret.message = 'Error fetching data';
            ret.data = error;
        }
        return ret;
    };
    
    // Function to perform a POST request
    postData = async (endpoint, data) => {
        var ret = {};
        try {
            const response = await axios.post(`${this._API_URL}/${endpoint}`, data);
            if(response.status == 200) {
                ret.success = true;
                ret.message = "Data posted successfully";
                ret = response.data;
            }
            else {
                ret.success = false;
                ret.message = `Error posting data: Server responded with status ${response.status}`;
                ret.data = null;
            }
        } 
        catch (error) {
            console.error('Error posting data:', error);
            ret.success = false;
            ret.message = 'Error posting data';
            ret.data = error;
        }
        return ret;
    };

    // Function to perform a PUT request
    putData = async (endpoint, data) => {
        var ret = {};
        try {
            const response = await axios.put(`${this._API_URL}/${endpoint}`, data);
            if(response.status == 200) {
                ret.success = true;
                ret.message = "Data updated successfully";
                ret = response.data;
            }
            else {
                ret.success = false;
                ret.message = `Error updating data: Server responded with status ${response.status}`;
                ret.data = null;
            }
        } 
        catch (error) {
            console.error('Error updating data:', error);
            ret.success = false;
            ret.message = 'Error updating data';
            ret.data = error;
        }
        return ret;
    };
    
    // Function to perform a DELETE request
    deleteData = async (endpoint) => {
        var ret = {};
        try {
            const response = await axios.delete(`${this._API_URL}/${endpoint}`);
            if(response.status == 200) {
                ret.success = true;
                ret.message = "Data deleted successfully";
                ret = response.data;
            }
            else {
                ret.success = false;
                ret.message = `Error deleting data: Server responded with status ${response.status}`;
                ret.data = null;
            }
        } 
        catch (error) {
            console.error('Error deleting data:', error);
            ret.success = false;
            ret.message = 'Error deleting data';
            ret.data = error;
        }
        return ret;
    };   
}

export default HttpClient;