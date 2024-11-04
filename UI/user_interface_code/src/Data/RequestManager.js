const RequestInstance = require("./RequestInstance");

class RequestManager {
    constructor() {
        this.api = RequestInstance.getInstance();
    }
    
    async fetchDashboardData(callback) {}

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

module.exports = requestManager;