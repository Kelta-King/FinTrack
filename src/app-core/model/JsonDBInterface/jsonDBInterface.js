const JsonDBInterfaceImpl = require("./jsonDBInterfaceImpl");

const impl = new JsonDBInterfaceImpl();

/**
 * Retrieves the total overview of financial data.
 * 
 * This function reads the "total_details" from the database and returns the total overview.
 * It returns a response object with a success flag and message.
 * 
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data retrieved if successful, or `null` if an error occurred.
 * 
 * @example
 * const totalOverview = getTotalOverview();
 * console.log(totalOverview); // Returns total financial data overview.
 */
function getTotalOverview() {
    return impl.getTotalOverview();
}

/**
 * Sets the total overview by validating the provided data and writing it to the database.
 * 
 * This function validates the format of the input `data` using the `MACROS.TOTAL_DETAILS_OBJECT_TEMPLATE` 
 * template. If the data format is valid. 
 * 
 * @param {Object|null} [data=null] - The data to be set for the total overview. Defaults to `null`.
 * 
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data written to the store if successful, or `null` if an error occurred.
 * 
 * @example
 * const result = setTotalOverview(MACROS.TOTAL_DETAILS_OBJECT_TEMPLATE);
 * console.log(result.success);  // true or false
 * console.log(result.message);  // success or error message
 * console.log(result.data);     // the written data or null if failed
 */
function setTotalOverview(data = null) {
    return impl.setTotalOverview(data);
}

/**
 * Retrieves the yearly total overview for a specific year.
 * 
 * This function retrieves the financial data for the specified year. If no year is provided,
 * the current year will be used. The function validates the year and returns a response object
 * containing the data for the year.
 * 
 * @param {string|null} year - The year for which to retrieve the overview (in "yyyy" format). If `null`, current year will be used.
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data retrieved if successful, or `null` if an error occurred.
 * 
 * @example
 * const yearlyOverview = getYearlyTotalOverview('2024');
 * console.log(yearlyOverview); // Returns yearly financial data for 2024.
 */
function getYearlyTotalOverview(year = null) {
    return impl.getYearlyTotalOverview(year);
}

/**
 * Sets the yearly total overview by validating the provided year and data format, then writing it to the store.
 * 
 * This function checks if the given year is valid and matches a specific format, then validates the input `data`
 * using the `MACROS.YEARLY_DETAILS_OBJECT_TEMPLATE`. 
 * 
 * @param {number|null} [year=null] - The year for the total overview. Defaults to `null`.
 * @param {Object|null} [data=null] - The data to be set for the yearly total overview. Defaults to `null`.
 * 
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data written to the store if successful, or `null` if an error occurred.
 * 
 * @example
 * const result = setYearlyTotalOverview(2024, MACROS.YEARLY_DETAILS_OBJECT_TEMPLATE);
 * console.log(result.success);  // true or false
 * console.log(result.message);  // success or error message
 * console.log(result.data);     // the written data or null if failed
 */
function setYearlyTotalOverview(year = null, data = null) {
    return impl.setYearlyTotalOverview(year, data);
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
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data retrieved if successful, or `null` if an error occurred.
 * 
 * @example
 * const monthlyOverview = getMonthlyTotalOverview('11', '2024');
 * console.log(monthlyOverview); // Returns monthly financial data for November 2024.
 */
function getMonthlyTotalOverview(month = null, year = null) {
    return impl.getMonthlyTotalOverview(month, year);
}

/**
 * Sets the monthly total overview by validating the provided month, year, and data format, then writing it to the store.
 * 
 * This function ensures that both the month and year are provided and valid. If it is valid, 
 * it proceeds to validate the `data` against the expected format 
 * defined in `MACROS.MONTHLY_DETAILS_OBJECT_TEMPLATE`. 
 * 
 * @param {number|null} [month=null] - The month for the total overview. Defaults to `null`.
 * @param {number|null} [year=null] - The year for the total overview. Defaults to `null`.
 * @param {Object|null} [data=null] - The data to be set for the monthly total overview. Defaults to `null`.
 * 
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data written to the store if successful, or `null` if an error occurred.
 * 
 * @example
 * const result = setMonthlyTotalOverview(12, 2024, MONTHLY_DETAILS_OBJECT_TEMPLATE);
 * console.log(result.success);  // true or false
 * console.log(result.message);  // success or error message
 * console.log(result.data);     // the written data or null if failed
 */
function setMonthlyTotalOverview(month = null, year = null, data = null) {
    return impl.setMonthlyTotalOverview(month, year, data);
}

/**
 * This function is not implemented yet.
 * It is intended to retrieve the weekly total overview of financial data.
 * 
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data retrieved if successful, or `null` if an error occurred.
 * 
 * @example
 * const weeklyOverview = getWeeklyTotalOverview();
 * console.log(weeklyOverview); // Returns weekly financial data (not yet implemented).
 */
function getWeeklyTotalOverview() {
    return impl.getWeeklyTotalOverview();
}

/**
 * This function is not implemented yet.
 * It is intended to save the weekly total overview of financial data.
 * 
 * @param {Object|null} [data=null] - An object containing the weekly total overview data.
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data written to the store if successful, or `null` if an error occurred.
 * 
 * @example
 * const weeklyOverview = getWeeklyTotalOverview();
 * console.log(weeklyOverview); // Returns weekly financial data (not yet implemented).
 */
function setWeeklyTotalOverview(data) {
    return impl.setWeeklyTotalOverview(data);
}

/**
 * Retrieves the expense details for a specific day.
 * 
 * This function retrieves daily expense details for a specific date. If no date is provided,
 * it defaults to the current date. The function validates the date and returns the data for that day.
 * 
 * @param {string|null} date - The date for which to retrieve the expense details (in "dd-mm-yyyy" format). If `null`, current date will be used.
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data retrieved if successful, or `null` if an error occurred.
 * 
 * @example
 * const dayExpenses = getDailyExpenseDetails('30-11-2024');
 * console.log(dayExpenses); // Returns daily expense data for 30-11-2024.
 */
function getDailyExpenseDetails(date = null) {
    return impl.getDailyExpenseDetails(date);
}

/**
 * Sets the daily expense details by validating the provided date and data format, then writing the data to the store.
 * 
 * This function checks if the given date is valid, and if no date is provided, it fails. 
 * It validates the format of the input `data` against the `MACROS.DAILY_DETAILS_OBJECT_TEMPLATE` and 
 * validates each expense object with MACROS.EXPENSE_SINGLE_OBJECT_TEMPLATE. 
 * 
 * @param {string|null} [date=null] - The date for the daily expenses. Defaults to `null`, in which case the current date is used.
 * @param {Object|null} [data=null] - The data to be set for the daily expense details. Defaults to `null`.
 * 
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data written to the store if successful, or `null` if an error occurred.
 * 
 * @example
 * const result = setDailyExpenseDetails("2024-12-07", MACROS.DAILY_DETAILS_OBJECT_TEMPLATE);
 * console.log(result.success);  // true or false
 * console.log(result.message);  // success or error message
 * console.log(result.data);     // the written data or null if failed
 */
function setDailyExpenseDetails(date = null, data = null) {
    return impl.setDailyExpenseDetails(date, data);
}

/**
 * Retrieves expense details for a specified date range.
 *
 * @param {string} startDate - The start date of the range in "dd-mm-yyyy" format.
 * @param {string} endDate - The end date of the range in "dd-mm-yyyy" format. If null, defaults to the current date.
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data retrieved if successful, or `null` if an error occurred.
 */
function getExpensesInRange(startDate, endDate) {
    return impl.getExpensesInRange(startDate, endDate);
}

/**
 * Retrieves the auto-debit details.
 * 
 * This function retrieves auto-debit details from the database.
 * 
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data retrieved if successful, or `null` if an error occurred.
 * 
 * @example
 * const autoDebitDetails = getAutodebitDetails();
 * console.log(autoDebitDetails); // Returns auto-debit details.
 */
function getAutodebitDetails() {
    return impl.getAutodebitDetails();
}

/**
 * Sets the auto debit details by validating the provided data format and writing it to the store.
 * 
 * This function validates the input `data` against the `MACROS.AUTO_DEBIT_DETAILS_OBJECT_TEMPLATE`. If the data is 
 * valid, it writes the data to the store under the key `auto_debit_details`. 
 * 
 * @param {Object|null} [data=null] - The data to be set for the auto debit details. Defaults to `null`.
 * 
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data written to the store if successful, or `null` if an error occurred.
 * 
 * @example
 * const result = setAutoDebitDetails(MACROS.AUTO_DEBIT_DETAILS_OBJECT_TEMPLATE);
 * console.log(result.success);  // true or false
 * console.log(result.message);  // success or error message
 * console.log(result.data);     // the written data or null if failed
 */
function setAutodebitDetails(data = null) {
    return impl.setAutoDebitDetails(data);
}

/**
 * Retrieves the user details.
 * 
 * This function retrieves user details from the database.
 * 
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data retrieved if successful, or `null` if an error occurred.
 * 
 * @example
 * const userDetails = getUserDetails();
 * console.log(userDetails); // Returns user details.
 */
function getUserDetails() {
    return impl.getUserDetails();
}

/**
 * Sets the user details by validating the provided data format and writing it to the store.
 * 
 * This function validates the input `data` against the `MACROS.USER_DETAILS_OBJECT_TEMPLATE`. If the data is valid, 
 * it writes the data to the store under the key `user_details`. 
 * 
 * @param {Object|null} [data=null] - The data to be set for the user details. Defaults to `null`.
 * 
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): The data written to the store if successful, or `null` if an error occurred.
 * 
 * @example
 * const result = setUserDetails(MACROS.USER_DETAILS_OBJECT_TEMPLATE);
 * console.log(result.success);  // true or false
 * console.log(result.message);  // success or error message
 * console.log(result.data);     // the written data or null if failed
 */
function setUserDetails(data = null) {
    return impl.setUserDetails(data);
}

/**
 * Resets the database to its initial state.
 * 
 * This function calls the implementation's resetDB method to clear all data
 * and return the database to its original, empty state.
 * 
 * @returns {Object} The response object containing the status of the operation:
 * - `success` (boolean): Indicates whether the reset operation was successful.
 * - `message` (string): Provides additional information about the operation, including error messages if any.
 * - `data` (Object|null): Null for the success case and error object for exception case.
 */
function resetDB() {
    return impl.resetDB();
}


module.exports = {
    getMonthlyTotalOverview,
    setMonthlyTotalOverview,
    getYearlyTotalOverview,
    setYearlyTotalOverview,
    getDailyExpenseDetails,
    setDailyExpenseDetails,
    getExpensesInRange,
    getAutodebitDetails,
    setAutodebitDetails,
    getUserDetails,
    setUserDetails,
    getTotalOverview,
    setTotalOverview,
    resetDB,
};