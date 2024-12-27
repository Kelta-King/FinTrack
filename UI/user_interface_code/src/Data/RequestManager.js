import RequestInstance from "./RequestInstance";
const RESPONSE_TEMPLATE = {
    success: false,
    message: '',
    data: null
};
class RequestManager {
    constructor() {
        this.api = RequestInstance.getInstance();
    }

    async signInUser(passKey, successCallback, errorCallback) {
        var response = RESPONSE_TEMPLATE;
        try {
            const ret = await this.api.postData('signin', {
                passKey: passKey,
            });
            
            if(ret.success) {
                if(ret.data.hasOwnProperty("token")) {
                    this.api.setAuthToken(ret.data.token);
                }                
                successCallback(ret);
            }
            else {
                errorCallback(ret);
            }
        } 
        catch (error) {
            response.message = error.message;
            errorCallback(response);
        }
    }
    
    async fetchDashboardData(successCallback, errorCallback) {
        var response = { ...RESPONSE_TEMPLATE };
        try {
            const ret = await this.api.getData('api/version');
            response.data = ret;
            if(ret.success) {
                successCallback(ret);
            }
            else {
                errorCallback(ret);
            }
        } 
        catch (error) {
            response.message = error.message;
            response.success = false;
            errorCallback(response);
        }
    }

    async fetchTransactionsData(successCallback, errorCallback) {
        var response = { ...RESPONSE_TEMPLATE };
        try {
            const ret = await this.api.getData('api/version');
            response.data = ret;
            if(ret.success) {
                successCallback(ret);
            }
            else {
                errorCallback(ret);
            }
        } 
        catch (error) {
            response.message = error.message;
            response.success = false;
            errorCallback(response);
        }
    }

    async fetchCustomViewData(successCallback, errorCallback) {
        var response = { ...RESPONSE_TEMPLATE };
        try {
            const ret = await this.api.getData('api/version');
            response.data = ret;
            if(ret.success) {
                successCallback(ret);
            }
            else {
                errorCallback(ret);
            }
        } 
        catch (error) {
            response.message = error.message;
            response.success = false;
            errorCallback(response);
        }
    }
    
    async fetchAutoDebitsData(successCallback, errorCallback) {
        var response = { ...RESPONSE_TEMPLATE };
        try {
            const ret = await this.api.getData('api/version');
            response.data = ret;
            if(ret.success) {
                successCallback(ret);
            }
            else {
                errorCallback(ret);
            }
        } 
        catch (error) {
            response.message = error.message;
            response.success = false;
            errorCallback(response);
        }
    }

    async fetchPreferencesData(successCallback, errorCallback) {
        var response = { ...RESPONSE_TEMPLATE };
        try {
            const ret = await this.api.getData('api/version');
            response.data = ret;
            if(ret.success) {
                successCallback(ret);
            }
            else {
                errorCallback(ret);
            }
        } 
        catch (error) {
            response.message = error.message;
            response.success = false;
            errorCallback(response);
        }
    }

    async fetchSettingsData(successCallback, errorCallback) {
        var response = { ...RESPONSE_TEMPLATE };
        try {
            const ret = await this.api.getData('api/version');
            response.data = ret;
            if(ret.success) {
                successCallback(ret);
            }
            else {
                errorCallback(ret);
            }
        } 
        catch (error) {
            response.message = error.message;
            response.success = false;
            errorCallback(response);
        }
    }

    async fetchAccountData(successCallback, errorCallback) {
        var response = { ...RESPONSE_TEMPLATE };
        try {
            const ret = await this.api.getData('api/version');
            response.data = ret;
            if(ret.success) {
                successCallback(ret);
            }
            else {
                errorCallback(ret);
            }
        } 
        catch (error) {
            response.message = error.message;
            response.success = false;
            errorCallback(response);
        }
    }

    async fetchExpensesData(successCallback, errorCallback) {
        var response = { ...RESPONSE_TEMPLATE };
        try {
            const ret = await this.api.getData('api/version');
            response.data = ret;
            if(ret.success) {
                successCallback(ret);
            }
            else {
                errorCallback(ret);
            }
        } 
        catch (error) {
            response.message = error.message;
            response.success = false;
            errorCallback(response);
        }
    }

    async fetchSettingData(successCallback, errorCallback) {
        var response = { ...RESPONSE_TEMPLATE };
        try {
            const ret = await this.api.getData('api/version');
            // response.data = ret;
            console.log(ret);
            
            if(ret.success) {
                successCallback(ret);
            }
            else {
                errorCallback(ret);
            }
        } 
        catch (error) {
            response.message = error.message;
            response.success = false;
            errorCallback(response);
        }
    }

    // Add more methods as needed for other API endpoints
}

const requestManager = new RequestManager();
Object.freeze(requestManager);

export default requestManager;