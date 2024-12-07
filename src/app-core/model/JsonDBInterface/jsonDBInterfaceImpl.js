const MACROS = require("../MACROS/MACROS");
const LOGGER = require("../../../Logger/logger");
const JsonDB = require("../JsonDB/jsonDB");

const RESPONSE_TEMPLATE = {
    success: false,
    message: '',
    data: null
}

class JsonDBInterfaceImpl {

    constructor() {}
    _getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0'); // Adds leading zero if day is less than 10
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const year = today.getFullYear();

        return `${day}-${month}-${year}`;
    };

    _isValidDate = (dateString = null) => {
        if (dateString == null || typeof dateString !== "string") {
            return false;
        }
        const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
        if (!dateRegex.test(dateString)) {
            return false;
        }

        const [day, month, year] = dateString.split('-').map(num => parseInt(num, 10));
        const date = new Date(year, month - 1, day);

        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    };

    _isValidDataFormat = (formatData = null, data = null) => {
        if(formatData == null || typeof formatData !== "string") {
            return false;
        }
        Object.keys(formatData).forEach(key => {
            if(!data.hasOwnProperty(key)) {
                return false;
            }
        });
        Object.keys(data).forEach(key => {
            if(!formatData.hasOwnProperty(key)) {
                return false;
            }
        });
        return true;
    }

    _formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    _getDatesInRange = (startDate, endDate) => {
        if(startDate == null || typeof startDate !== "string") {
            throw new Error('Invalid start date');
        }
        if(endDate == null || typeof endDate!== "string") {
            throw new Error('Invalid end date');
        }

        const start = startDate.split('-');
        const end = endDate.split('-');
    
        const startDateObj = new Date(parseInt(start[2]), parseInt(start[1]) - 1, parseInt(start[0]));
        const endDateObj = new Date(parseInt(end[2]), parseInt(end[1]) - 1, parseInt(end[0]));
    
        if (startDateObj > endDateObj) {
            throw new Error('Start date cannot be later than end date');
        }
    
        const result = [];
        let currentDate = startDateObj;
    
        while (currentDate <= endDateObj) {
            result.push(this._formatDate(currentDate));
            currentDate.setDate(currentDate.getDate() + 1); // Increment day by 1
        }
    
        return result;
    };

    getTotalOverview = () => {
        var response = RESPONSE_TEMPLATE;
        var ret = JsonDB.readKey("total_details");
        if (ret.code != 0) {
            LOGGER.error(`Failed to read total_details: ${ret.message}, Error: ${ret.code}`);
            response.data = null;
            response.message = ret.message;
            response.success = false;
            return response;
        }
        response.data = ret.data;
        response.success = true;
        response.message = ret.message;
        return response;
    }

    setTotalOverview = (data = null) => {
        var response = RESPONSE_TEMPLATE;

        if (!this._isValidDataFormat(MACROS.TOTAL_DETAILS_OBJECT_TEMPLATE, data)) {
            response.success = false;
            response.message = 'Invalid data provided to set total overview.';
            response.data = null;
            return response;
        }

        var ret = JsonDB.writeKey("total_details", data);
        if (ret.code != 0) {
            LOGGER.error(`Failed to write total_details: ${ret.message}, Error: ${ret.code}`);
            response.data = null;
            response.message = ret.message;
            response.success = false;
            return response;
        }
        response.data = ret.data;
        response.success = true;
        response.message = ret.message;
        return response;
    }
    
    getYearlyTotalOverview = (year = null) => {
        var response = RESPONSE_TEMPLATE;
        var currentDate = this._getCurrentDate();
    
        if (year == null) {
            year = currentDate.split("-")[2]; // Use current year if no year provided
        }
        var checkDate = `11-11-${year}`;
        if (!this._isValidDate(checkDate)) {
            LOGGER.error(`Invalid year: ${year}. Check date: ${checkDate}`);
            response.data = null;
            response.message = "Invalid year provided";
            response.success = false;
            return response;
        }
        var ret = JsonDB.readKey(`yearly_details#${checkDate}`);
        if (ret.code != 0) {
            LOGGER.error(`Failed to read yearly_details for ${year}: ${ret.message}, Error: ${ret.code}`);
            response.data = null;
            response.message = ret.message;
            response.success = false;
            return response;
        }
        response.data = ret.data;
        response.success = true;
        response.message = ret.message;
        return response;
    }

    setYearlyTotalOverview = (year = null, data = null) => {
        var response = RESPONSE_TEMPLATE;
    
        if (year == null) {
            response.data = null;
            response.message = "Invalid year provided";
            response.success = false;
            return response;
        }

        var checkDate = `11-11-${year}`;
        if (!this._isValidDate(checkDate)) {
            LOGGER.error(`Invalid year: ${year}. Check date: ${checkDate}`);
            response.data = null;
            response.message = "Invalid year provided";
            response.success = false;
            return response;
        }

        if(!this._isValidDataFormat(MACROS.YEARLY_DETAILS_OBJECT_TEMPLATE, data)) {
            LOGGER.error(`Invalid data format for yearly_details: ${JSON.stringify(data)}`);
            response.data = null;
            response.message = "Invalid data format provided";
            response.success = false;
            return response;
        }

        var ret = JsonDB.writeKey(`yearly_details#${checkDate}`, data);
        if (ret.code != 0) {
            LOGGER.error(`Failed to read yearly_details for ${year}: ${ret.message}, Error: ${ret.code}`);
            response.data = null;
            response.message = ret.message;
            response.success = false;
            return response;
        }
        response.data = ret.data;
        response.success = true;
        response.message = ret.message;
        return response;
    }
    
    getMonthlyTotalOverview = (month = null, year = null) => {
        var response = RESPONSE_TEMPLATE;
        var currentDate = this._getCurrentDate();
    
        if (month == null) {
            month = currentDate.split("-")[1]; // Use current month if no month provided
        }
        if (year == null) {
            year = currentDate.split("-")[2]; // Use current year if no year provided
        }
    
        month = month.toString().padStart(2, '0');
        var checkDate = `11-${month}-${year}`;
    
        if (!this._isValidDate(checkDate)) {
            LOGGER.error(`Invalid data provided. Month: ${month}, Year: ${year}.Check date: ${checkDate}.`);
            response.data = null;
            response.message = "Invalid data provided.";
            response.success = false;
            return response;
        }
    
        var ret = JsonDB.readKey(`monthly_details#${checkDate}`);
        if (ret.code != 0) {
            LOGGER.error(`Failed to read monthly_details for ${checkDate}: ${ret.message}, Error: ${ret.code}`);
            response.data = null;
            response.message = ret.message;
            response.success = false;
            return response;
        }
        response.data = ret.data;
        response.success = true;
        response.message = ret.message;
        return response;
    }

    setMonthlyTotalOverview = (month = null, year = null, data = null) => {
        var response = RESPONSE_TEMPLATE;
    
        if (month == null) {
            response.success = false;
            response.message = "Month is mandatory.";
            response.data = null;
            return response;
        }
        if (year == null) {
            response.success = false;
            response.message = "Year is mandatory.";
            response.data = null;
            return response;
        }
    
        month = month.toString().padStart(2, '0');
        var checkDate = `11-${month}-${year}`;
    
        if (!this._isValidDate(checkDate)) {
            LOGGER.error(`Invalid date provided. Month: ${month}, Year: ${year}.Check date: ${checkDate}.`);
            response.data = null;
            response.message = "Invalid date provided.";
            response.success = false;
            return response;
        }

        if(!this._isValidDataFormat(MACROS.MONTHLY_DETAILS_OBJECT_TEMPLATE, data)) {
            LOGGER.error(`Invalid data format for monthly_details: ${JSON.stringify(data)}`);
            response.data = null;
            response.message = "Invalid data format provided";
            response.success = false;
            return response;
        }
    
        var ret = JsonDB.writeKey(`monthly_details#${checkDate}`, data);
        if (ret.code != 0) {
            LOGGER.error(`Failed to write monthly_details for ${checkDate}: ${ret.message}, Error: ${ret.code}`);
            response.data = null;
            response.message = ret.message;
            response.success = false;
            return response;
        }
        response.data = ret.data;
        response.success = true;
        response.message = ret.message;
        return response;
    }
    
    getWeeklyTotalOverview = () => {
        var response = RESPONSE_TEMPLATE;
        return response;
    }

    setWeeklyTotalOverview = (data = null) => {
        var response = RESPONSE_TEMPLATE;
        return response;
    }

    getDailyExpenseDetails = (date = null) => {
        var response = RESPONSE_TEMPLATE;
        var currentDate = this._getCurrentDate();
    
        if (date == null) {
            date = currentDate; // Use current date if no date provided
        }
    
        if (!this._isValidDate(date)) {
            LOGGER.error(`Invalid data provided. Date: ${date}.`);
            response.data = null;
            response.message = "Invalid data provided.";
            response.success = false;
            return response;
        }
    
        var ret = JsonDB.readKey(`daily_details#${date}`);
        if (ret.code != 0) {
            LOGGER.error(`Failed to read daily_details for ${date}: ${ret.message}, Error: ${ret.code}`);
            response.data = null;
            response.message = ret.message;
            response.success = false;
            return response;
        }
        response.data = ret.data;
        response.success = true;
        response.message = ret.message;
    
        return response;
    }

    setDailyExpenseDetails = (date = null, data = null) => {
        var response = RESPONSE_TEMPLATE;
        
        if (date == null) {
            response.data = null;
            response.message = "Date is mandatory.";
            response.success = false;
            return response;
        }
    
        if (!this._isValidDate(date)) {
            LOGGER.error(`Invalid date provided. Date: ${date}.`);
            response.data = null;
            response.message = "Invalid date provided.";
            response.success = false;
            return response;
        }

        if(!this._isValidDataFormat(MACROS.DAILY_DETAILS_OBJECT_TEMPLATE, data)) {
            LOGGER.error(`Invalid data format for daily_details: ${JSON.stringify(data)}`);
            response.data = null;
            response.message = "Invalid data format provided";
            response.success = false;
            return response;
        }

        data.expensesList.forEach((expeseObj) => {
            if(!this._isValidDataFormat(MACROS.EXPENSE_SINGLE_OBJECT_TEMPLATE, expeseObj)) {
                LOGGER.error(`Invalid expense object format: ${JSON.stringify(expeseObj)}`);
                response.data = null;
                response.message = "Invalid expense object format provided";
                response.success = false;
                return;
            }
        });
    
        var ret = JsonDB.writeKey(`daily_details#${date}`, data);
        if (ret.code != 0) {
            LOGGER.error(`Failed to write daily_details for ${date}: ${ret.message}, Error: ${ret.code}`);
            response.data = null;
            response.message = ret.message;
            response.success = false;
            return response;
        }
        response.data = ret.data;
        response.success = true;
        response.message = ret.message;
    
        return response;
    }

    getExpensesInRange = (startDate = null, endDate = null) => {
        var response = RESPONSE_TEMPLATE;
        var currentDate = this._getCurrentDate();
    
        if(startDate == null) {
            response.data = null;
            response.message = "Start date is mandatory";
            response.success = false;
            return response;
        }

        if(endDate == null) {
            endDate = currentDate;
        }

        if(!this._isValidDate(startDate)) {
            LOGGER.error(`Invalid start date: ${startDate}.`);
            response.data = null;
            response.message = "Invalid start date provided";
            response.success = false;
            return response;
        }
        
        if(!this._isValidDate(endDate)) {
            LOGGER.error(`Invalid end date: ${endDate}.`);
            response.data = null;
            response.message = "Invalid end date provided";
            response.success = false;
            return response;
        }

        var listOfDates = this._getDatesInRange(startDate, endDate);

        if(listOfDates.length > 365) {
            LOGGER.error(`Maximum 1 year range is allowed`);
            response.data = null;
            response.message = "Maximum 1 year range is allowed";
            response.success = false;
            return response;
        }

        var finalData = MACROS.DAILY_DETAILS_OBJECT_TEMPLATE;
        var keys = Object.keys(finalData);
        listOfDates.forEach((date) => {
            const ret = this.getDailyExpenseDetails(date);
            if(ret.success) {
                keys.forEach((key) => {
                    if(ret.data.hasOwnProperty(key(key))) {
                        if(key === "expenses_list") {
                            finalData[key](key).push(ret.data[key](key));
                        }
                        else {
                            finalData[key](key) += ret.data[key](key);
                        }
                    }
                });
            }
        });
        console.log(finalData);
        response.success = true;
        response.message = "Expense details fetched successfully";
        response.data = finalData;
        return response;
    }

    getAutodebitDetails = () => {
        var response = RESPONSE_TEMPLATE;
        var ret = JsonDB.readKey("auto_debit_details");
        if (ret.code != 0) {
            LOGGER.error(`Failed to read auto_debit_details: ${ret.message}, Error: ${ret.code}`);
            response.data = null;
            response.message = ret.message;
            response.success = false;
            return response;
        }
        response.data = ret.data;
        response.success = true;
        response.message = ret.message;
        return response;
    }

    setAutoDebitDetails = (data = null) => {
        var response = RESPONSE_TEMPLATE;
        if(!this._isValidDataFormat(MACROS.AUTO_DEBIT_DETAILS_OBJECT_TEMPLATE, data)) {
            LOGGER.error(`Invalid data format for auto_debit_details: ${JSON.stringify(data)}`);
            response.data = null;
            response.message = "Invalid data format provided";
            response.success = false;
            return response;
        }
        var ret = JsonDB.writeKey("auto_debit_details", data);
        if (ret.code != 0) {
            LOGGER.error(`Failed to write auto_debit_details: ${ret.message}, Error: ${ret.code}`);
            response.data = null;
            response.message = ret.message;
            response.success = false;
            return response;
        }
        response.data = ret.data;
        response.success = true;
        response.message = ret.message;
        return response;
    }
    
    getUserDetails = () => {
        var response = RESPONSE_TEMPLATE;
        var ret = JsonDB.readKey("user_details");
        if (ret.code != 0) {
            LOGGER.error(`Failed to read user_details: ${ret.message}, Error: ${ret.code}`);
            response.data = null;
            response.message = ret.message;
            response.success = false;
            return response;
        }
        response.data = ret.data;
        response.success = true;
        response.message = ret.message;
        return response;
    };

    setUserDetails = (data = null) => {
        var response = RESPONSE_TEMPLATE;
        if(!this._isValidDataFormat(MACROS.USER_DETAILS_OBJECT_TEMPLATE, data)) {
            LOGGER.error(`Invalid data format for user_details: ${JSON.stringify(data)}`);
            response.data = null;
            response.message = "Invalid data format provided";
            response.success = false;
            return response;
        }
        var ret = JsonDB.writeKey("user_details", data);
        if (ret.code != 0) {
            LOGGER.error(`Failed to write user_details: ${ret.message}, Error: ${ret.code}`);
            response.data = null;
            response.message = ret.message;
            response.success = false;
            return response;
        }
        response.data = ret.data;
        response.success = true;
        response.message = ret.message;
    }
};

module .exports = JsonDBInterfaceImpl;