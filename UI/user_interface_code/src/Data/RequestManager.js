const getInstance = require("./RequestInstance");

class RequestManager {
    constructor() {
        this.api = getInstance();
    }
    
    async fetchDashboardData() {}

    async fetchTransactionsData() {}

    async fetchCustomViewData() {}
    
    async fetchAutoDebitsData() {}

    async fetchPreferencesData() {}

    async fetchSettingsData() {}

    async fetchAccountData() {}

    // Add more methods as needed for other API endpoints
}

const requestManager = new RequestManager();
Object.freeze(requestManager);

module.exports = requestManager;