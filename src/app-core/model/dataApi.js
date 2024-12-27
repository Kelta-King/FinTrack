const LOGGER = require("../../Logger/logger");
const dbInterface = require("./JsonDBInterface/jsonDBInterface");
const { MONTHS_MAPPING, ERROR_CODES } = require("./MACROS/MACROS");
const DataAPIImpl = require("./dataAPIImplementation");

class DataAPIInterface {

    dataApiImpl = new DataAPIImpl();
    
    getCurrentMonthOverview = () => {
        return this.dataApiImpl.getCurrentMonthOverview();
    }
    
    getCurrentYearOverview = () => {
        return this.dataApiImpl.getCurrentYearOverview();
    }
    
    getRecentTransactions = (limit) => {
        return this.dataApiImpl.getRecentTransactions(limit);
    }
    
    getTotalOverview = () => {
        return this.dataApiImpl.getTotalOverview();
    }
    
    verifyUserKey = () => { 
        
    }
    getUserDetails = () => {
        return this.dataApiImpl.getUserDetails();
    }

    setUserDetails = (data) => {
        return this.dataApiImpl.setUserDetails(data);
    }

    getPastMonthsOverview = (limitOfMonths) => {
        return this.dataApiImpl.getPastMonthsOverview(limitOfMonths);
    }
    
    getUpcomingAutoDebits = (limitOfAutoDebits) => {
        return this.dataApiImpl.getUpcomingAutoDebits(limitOfAutoDebits);
    }
    
    getCurrentMonthCompleteDetails = () => {
        return this.dataApiImpl.getCurrentMonthCompleteDetails();
    }

    getMonthOverview = (month = null, year = null) => {
        return this.dataApiImpl.getMonthOverview(month, year);
    }

    getYearOverview = (year = null) => {
        return this.dataApiImpl.getYearOverview(year);
    }
    
    getMonthCompleteDetails = (month = null, year = null) => {
        return this.dataApiImpl.getMonthCompleteDetails(month, year);
    }
    
    getAutoDebitDetails = () => {
        return this.dataApiImpl.getAutoDebitDetails();
    }
    
    addAutoDebit = (data = null) => {
        return this.dataApiImpl.addAutoDebit(data);
    }
    
    editAutoDebit = (id = null, data = null) => {
        return this.dataApiImpl.editAutoDebit(id, data);
    }
    
    deleteAutoDebit = (id = null) => {
        return this.dataApiImpl.deleteAutoDebit(id);
    }
    
    addExpense = (date = null, data = null) => {
        return this.dataApiImpl.addExpense(date, data);
    }
    
    editExpense = (id = null, data = null) => {
        return this.dataApiImpl.editExpense(id, data);
    }
    
    deleteExpense = (id = null) => {
        return this.dataApiImpl.deleteExpense(id);
    }
}

const dataApi = new DataAPIInterface()

module.exports = dataApi;