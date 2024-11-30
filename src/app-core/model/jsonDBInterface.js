const MACROS = require("./MACROS");
const LOGGER = require("../../../Logger/logger");
const JsonDB = require("./JsonDB/jsonDB");

const RESPONSE_TEMPLATE = {
    success: false,
    message: '',
    data: null
}

/**
 * Retrieves the current date in dd-mm-yyyy format.
 * 
 * This function uses the system's current date and formats it as "dd-mm-yyyy".
 * The returned date string is always in two-digit day and month format.
 * 
 * @returns {string} The current date formatted as "dd-mm-yyyy".
 * 
 * @example
 * const currentDate = getCurrentDate();
 * console.log(currentDate); // Example: "30-11-2024"
 */
const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Adds leading zero if day is less than 10
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
};

/**
 * Checks if a given date string is in a valid format and represents a real date.
 * 
 * The date must be in the format "dd-mm-yyyy". The function will verify that the date
 * is logically valid (e.g., 31-02-2024 will be considered invalid).
 * 
 * @param {string|null} dateString - The date string to be validated. It should be in "dd-mm-yyyy" format.
 * @returns {boolean} `true` if the date string is valid, otherwise `false`.
 * 
 * @example
 * const isValid = isValidDate("31-12-2024");
 * console.log(isValid); // true
 */
function isValidDate(dateString = null) {
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
}

/**
 * Retrieves the total overview of financial data.
 * 
 * This function reads the "total_details" from the database and returns the total overview.
 * It returns a response object with a success flag and message.
 * 
 * @returns {Object} An object containing the success status, message, and data of the total overview.
 * 
 * @example
 * const totalOverview = getTotalOverview();
 * console.log(totalOverview); // Returns total financial data overview.
 */
function getTotalOverview() {
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

/**
 * Retrieves the yearly total overview for a specific year.
 * 
 * This function retrieves the financial data for the specified year. If no year is provided,
 * the current year will be used. The function validates the year and returns a response object
 * containing the data for the year.
 * 
 * @param {string|null} year - The year for which to retrieve the overview (in "yyyy" format). If `null`, current year will be used.
 * @returns {Object} An object containing the success status, message, and data for the yearly total overview.
 * 
 * @example
 * const yearlyOverview = getYearlyTotalOverview('2024');
 * console.log(yearlyOverview); // Returns yearly financial data for 2024.
 */
function getYearlyTotalOverview(year = null) {
    var response = RESPONSE_TEMPLATE;
    var currentDate = getCurrentDate();

    if (year == null) {
        year = currentDate.split("-")[2]; // Use current year if no year provided
    }
    var checkDate = `11-11-${year}`;
    if (!isValidDate(checkDate)) {
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

/**
 * Retrieves the monthly total overview for a specific month and year.
 * 
 * This function retrieves the financial data for the specified month and year. If no month
 * or year is provided, it defaults to the current date. The function validates the date and
 * returns a response object containing the data for the month.
 * 
 * @param {string|null} month - The month for which to retrieve the overview (in "mm" format). If `null`, current month will be used.
 * @param {string|null} year - The year for which to retrieve the overview (in "yyyy" format). If `null`, current year will be used.
 * @returns {Object} An object containing the success status, message, and data for the monthly total overview.
 * 
 * @example
 * const monthlyOverview = getMonthlyTotalOverview('11', '2024');
 * console.log(monthlyOverview); // Returns monthly financial data for November 2024.
 */
function getMonthlyTotalOverview(month = null, year = null) {
    var response = RESPONSE_TEMPLATE;
    var currentDate = getCurrentDate();

    if (month == null) {
        month = currentDate.split("-")[1]; // Use current month if no month provided
    }
    if (year == null) {
        year = currentDate.split("-")[2]; // Use current year if no year provided
    }

    month = month.toString().padStart(2, '0');
    var checkDate = `11-${month}-${year}`;

    if (!isValidDate(checkDate)) {
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

/**
 * This function is not implemented yet.
 * It is intended to retrieve the weekly total overview of financial data.
 * 
 * @returns {Object} An object containing the weekly total overview data.
 *                   The object contains default values of the RESPONSE_TEMPLATE structure,
 *                   which includes:
 *                   - success: A boolean indicating if the operation was successful.
 *                   - message: A string providing additional information about the operation.
 *                   - data: The actual weekly total overview data (if available).
 * 
 * @example
 * const weeklyOverview = getWeeklyTotalOverview();
 * console.log(weeklyOverview); // Returns weekly financial data (not yet implemented).
 */
function getWeeklyTotalOverview() {
    var response = RESPONSE_TEMPLATE;
    return response;
}

/**
 * Retrieves the expense details for a specific day.
 * 
 * This function retrieves daily expense details for a specific date. If no date is provided,
 * it defaults to the current date. The function validates the date and returns the data for that day.
 * 
 * @param {string|null} date - The date for which to retrieve the expense details (in "dd-mm-yyyy" format). If `null`, current date will be used.
 * @returns {Object} An object containing the success status, message, and data for the day's expenses.
 * 
 * @example
 * const dayExpenses = getDayExpenseDetails('30-11-2024');
 * console.log(dayExpenses); // Returns daily expense data for 30-11-2024.
 */
function getDayExpenseDetails(date = null) {
    var response = RESPONSE_TEMPLATE;
    var currentDate = getCurrentDate();

    if (date == null) {
        date = currentDate; // Use current date if no date provided
    }

    if (!isValidDate(date)) {
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

/**
 * Retrieves the auto-debit details.
 * 
 * This function retrieves auto-debit details from the database.
 * 
 * @returns {Object} An object containing the success status, message, and auto-debit details.
 * 
 * @example
 * const autoDebitDetails = getAutodebitDetails();
 * console.log(autoDebitDetails); // Returns auto-debit details.
 */
function getAutodebitDetails() {
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

/**
 * Retrieves the user details.
 * 
 * This function retrieves user details from the database.
 * 
 * @returns {Object} An object containing the success status, message, and user details.
 * 
 * @example
 * const userDetails = getUserDetails();
 * console.log(userDetails); // Returns user details.
 */
function getUserDetails() {
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
}

module.exports = {
    getMonthlyTotalOverview,
    getYearlyTotalOverview,
    getDayExpenseDetails,
    getAutodebitDetails,
    getUserDetails,
    getTotalOverview,
};