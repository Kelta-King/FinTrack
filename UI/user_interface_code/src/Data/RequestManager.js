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
    
    async fetchDashboardData(callback) {
        var response = RESPONSE_TEMPLATE;
        try {
            const data = await this.api.getData('api/version');
            console.log(data);
            response.success = true;
            response.data = data;
        } catch (error) {
            response.message = error.message;
        }
        callback(response);
    }

    async fetchTransactionsData(callback) {}

    async fetchCustomViewData(callback) {}
    
    async fetchAutoDebitsData(callback) {}

    async fetchPreferencesData(callback) {}

    async fetchSettingsData(callback) {}

    async fetchAccountData(callback) {}

    // Add more methods as needed for other API endpoints
}

const requestManager = new RequestManager();
Object.freeze(requestManager);

export default requestManager;