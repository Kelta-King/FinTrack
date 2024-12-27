import axios from 'axios';
import NETWORK_CONFIG from './NetworkConfig';

class HttpClient {
    constructor() {
        this._AUTH_TOKEN = localStorage.getItem("PASS_KEY");;
        this._API_URL = NETWORK_CONFIG.API_ENDPOINT;
    }

    setAuthToken(token) {
        this._AUTH_TOKEN = token;
        localStorage.setItem("PASS_KEY", token);
    }
    
    getData = async (endpoint) => {
        var ret = {};
        try {
            const headers = {
                Authorization: this._AUTH_TOKEN
            };
            const response = await axios.get(`${this._API_URL}/${endpoint}`, { headers: headers, validateStatus: false });
            if(response.status == 200) {
                ret.code = response.status;
                ret.success = true;
                ret.message = "Data fetched successfully";
                ret.data = response.data;
            }
            else {
                ret.code = response.status;
                ret.success = false;
                ret.message = `Error fetching data: Server responded with status ${response.status}`;
                ret.data = response.data;
            }
        } 
        catch (error) {
            console.error('Error fetching data:', error);
            ret.code = 0;
            ret.success = false;
            ret.message = 'Error fetching data';
            ret.data = error;
        }
        return ret;
    };
    
    postData = async (endpoint, data) => {
        var ret = {};
        try {
            const headers = {
                Authorization: this._AUTH_TOKEN
            };
            const response = await axios.post(`${this._API_URL}/${endpoint}`, data, {headers: headers, validateStatus: false});
            if(response.status == 200) {
                ret.code = response.status;
                ret.success = true;
                ret.message = "Data posted successfully";
                ret.data = response.data;
            }
            else {
                ret.code = response.status;
                ret.success = false;
                ret.message = `Error posting data: Server responded with status ${response.status}`;
                ret.data = response.data;
            }
        } 
        catch (error) {
            console.error('Error posting data:', error);
            ret.code = 0;
            ret.success = false;
            ret.message = 'Error posting data';
            ret.data = error;
        }
        return ret;
    };

    putData = async (endpoint, data) => {
        var ret = {};
        try {
            const headers = {
                Authorization: this._AUTH_TOKEN
            };
            const response = await axios.put(`${this._API_URL}/${endpoint}`, data, {headers: headers, validateStatus: false});
            if(response.status == 200) {
                ret.code = response.status;
                ret.success = true;
                ret.message = "Data updated successfully";
                ret.data = response.data;
            }
            else {
                ret.code = response.status;
                ret.success = false;
                ret.message = `Error updating data: Server responded with status ${response.status}`;
                ret.data = response.data;
            }
        } 
        catch (error) {
            console.error('Error updating data:', error);
            ret.code = 0;
            ret.success = false;
            ret.message = 'Error updating data';
            ret.data = error;
        }
        return ret;
    };
    
    deleteData = async (endpoint) => {
        var ret = {};
        try {
            const headers = {
                Authorization: this._AUTH_TOKEN
            };
            const response = await axios.delete(`${this._API_URL}/${endpoint}`, { headers: headers, validateStatus: false });
            if(response.status == 200) {
                ret.code = response.status;
                ret.success = true;
                ret.message = "Data deleted successfully";
                ret.data = response.data;
            }
            else {
                ret.code = response.status;
                ret.success = false;
                ret.message = `Error deleting data: Server responded with status ${response.status}`;
                ret.data = response.data;
            }
        } 
        catch (error) {
            console.error('Error deleting data:', error);
            ret.code = 0;
            ret.success = false;
            ret.message = 'Error deleting data';
            ret.data = error;
        }
        return ret;
    };   
}

export default HttpClient;