const statusCode = require("../statusCode");
const path = require("path");
const fs = require("fs");
const LOGGER = require("../../../../Logger/logger");

// Every function will return data in this format
const RESPONSE_TEMPLATE = {
    code: statusCode.ERROR,
    message: '',
    data: {}
};

const dbPath = path.join(__dirname, 'DB');

// Helper function to check if a directory exists
function directoryExists(dirPath) {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

const isValidKey = (key = null) => {
    var response = RESPONSE_TEMPLATE;
    response.code = statusCode.INVALID_PARAMETER;
    response.message = 'Invalid key format. Please use dd-mm-yyyy format.';
    if (key === null) {
        return response;
    }
    if (typeof key !== 'string') {
        return response;
    }

    if (key.toLowerCase() === 'user_details') {
        response.code = statusCode.SUCCESS;
        response.message = 'Valid key provided';
        return response;
    }

    if (key.toLowerCase() === 'auto_debit_details') {
        response.code = statusCode.SUCCESS;
        response.message = 'Valid key provided';
        return response;
    }

    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(key)) {
        return response;
    }

    const [day, month, year] = key.split('-').map(Number);

    // Check if the date is valid using JavaScript's Date object
    const dateObj = new Date(year, month - 1, day); // month is 0-based in JS
    const ret = dateObj.getDate() === day && dateObj.getMonth() === month - 1 && dateObj.getFullYear() === year;

    if (ret) {
        response.code = statusCode.SUCCESS;
        response.message = 'Valid date provided';
        return response;
    }
    else {
        response.code = statusCode.INVALID_PARAMETER;
        response.message = 'Invalid date provided';
        return response;
    }
}

const readUserDetails = () => {
    var response = RESPONSE_TEMPLATE;
    const userDetailsFilePath = path.join(dbPath, `userDetails.json`);
    if (!fs.existsSync(userDetailsFilePath)) {
        response.code = statusCode.KEY_NOT_FOUND;
        response.message = `User details file not found.`;
        return response;
    }
    try {
        response.data = JSON.parse(fs.readFileSync(userDetailsFilePath, 'utf8'));
        response.code = statusCode.SUCCESS;
        response.message = 'File read successfully';
    }
    catch (error) {
        response.code = statusCode.ERROR;
        response.message = 'Error reading file: ' + error.message;
    }
    return response;
}

const readAutoDebitDetails = () => {
    var response = RESPONSE_TEMPLATE;
    const autoDebitDetailsFilePath = path.join(dbPath, `autoDebitDetails.json`);

    if (!fs.existsSync(autoDebitDetailsFilePath)) {
        response.code = statusCode.KEY_NOT_FOUND;
        response.message = `Auto debit details file not found.`;
        return response;
    }

    try {
        response.data = JSON.parse(fs.readFileSync(autoDebitDetailsFilePath, 'utf8'));
        response.code = statusCode.SUCCESS;
        response.message = 'File read successfully';
    } catch (error) {
        response.code = statusCode.ERROR;
        response.message = 'Error reading file: ' + error.message;
    }

    return response;
}

const writeUserDetails = (data = null) => {
    var response = RESPONSE_TEMPLATE;

    if (data === null) {
        response.code = statusCode.INVALID_PARAMETER;
        response.message = 'No data provided to write.';
        return response;
    }

    try {
        const userDetailsFilePath = path.join(dbPath, `userDetails.json`);

        if (!fs.existsSync(userDetailsFilePath)) {
            LOGGER.debug(`File does not exist: ${userDetailsFilePath}`);
        }

        fs.writeFileSync(userDetailsFilePath, JSON.stringify(data, null, 2), 'utf8');
        response.code = statusCode.SUCCESS;
        response.message = 'File written successfully';
    }
    catch (error) {
        response.code = statusCode.ERROR;
        response.message = 'Error writing file: ' + error.message;
    }
    return response;
}

const writeAutoDebitsDetails = (data = null) => {
    var response = RESPONSE_TEMPLATE;

    if (data === null) {
        response.code = statusCode.INVALID_PARAMETER;
        response.message = 'No data provided to write.';
        return response;
    }

    try {
        const autoDebitsDetailsFilePath = path.join(dbPath, `autoDebitsDetails.json`);

        if (!fs.existsSync(autoDebitsDetailsFilePath)) {
            LOGGER.debug(`File does not exist: ${autoDebitsDetailsFilePath}`);
        }

        fs.writeFileSync(autoDebitsDetailsFilePath, JSON.stringify(data, null, 2), 'utf8');
        response.code = statusCode.SUCCESS;
        response.message = 'File written successfully';
    }
    catch (error) {
        response.code = statusCode.ERROR;
        response.message = 'Error writing file: ' + error.message;
    }

    return response;
}

const readDateData = (key = null) => {
    var response = RESPONSE_TEMPLATE;

    if (key == null) {
        response.code = statusCode.INVALID_PARAMETER;
        response.message = 'Invalid key format. Please use dd-mm-yyyy format.';
        return response;
    }

    try {
        const [day, month, year] = key.split('-').map(Number);

        const yearFolderPath = path.join(dbPath, year.toString());
        if (!directoryExists(yearFolderPath)) {
            response.code = statusCode.KEY_NOT_FOUND;
            response.message = `Year folder ${year} not found.`;
            return response;
        }

        const monthFolderPath = path.join(yearFolderPath, month.toString().padStart(2, '0'));
        if (!directoryExists(monthFolderPath)) {
            response.code = statusCode.KEY_NOT_FOUND;
            response.message = `Month folder ${month.toString().padStart(2, '0')} not found.`;
            return response;
        }

        const expenseFilePath = path.join(monthFolderPath, `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}.json`);
        if (!fs.existsSync(expenseFilePath)) {
            response.code = statusCode.KEY_NOT_FOUND;
            response.message = `Expense file for ${key} not found.`;
            return response;
        }

        response.data = JSON.parse(fs.readFileSync(expenseFilePath, 'utf8'));
        response.code = statusCode.SUCCESS;
        response.message = 'File read successfully';
    }
    catch (error) {
        response.code = statusCode.ERROR;
        response.message = 'Error reading file: ' + error.message;
    }
    return response;
}

const writeDateData = (key = null, data = null) => {
    var response = RESPONSE_TEMPLATE;
    
    if (key == null || data === null) {
        response.code = statusCode.INVALID_PARAMETER;
        response.message = 'Invalid key or data provided to write.';
        return response;
    }
    
    try {
        var count = 0;
        const [day, month, year] = key.split('-').map(Number);

        const yearFolderPath = path.join(dbPath, year.toString());
        if (!directoryExists(yearFolderPath)) {
            count++;
            fs.mkdirSync(yearFolderPath, { recursive: true });
        }

        const monthFolderPath = path.join(yearFolderPath, month.toString().padStart(2, '0'));
        if (!directoryExists(monthFolderPath)) {
            count++;
            fs.mkdirSync(monthFolderPath, { recursive: true });
        }

        const expenseFilePath = path.join(monthFolderPath, `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}.json`);

        fs.writeFileSync(expenseFilePath, JSON.stringify(data, null, 2), 'utf8');
        response.code = statusCode.SUCCESS;
        if (count > 0) {
            response.message = `Expense file for ${key} created and written successfully. ${count} new directory(ies) created.`;
        }
        else {
            response.message = `Expense file for ${key} written successfully.`;
        }
    }
    catch (error) {
        response.code = statusCode.ERROR;
        response.message = `Error writing file: ${error.message}`;
    }
    return response;
}

/**
 * Reads a file based on the provided key. The function handles special cases for predefined keys (`user_details`, `auto_debit_details`) 
 * by calling corresponding helper functions. For other keys, it attempts to locate and read a dynamically generated file path 
 * using a `day-month-year` formatted string (e.g., '15-04-2024') and returns the content of that file.
 *
 * @param {string} key - The identifier for the file to read. This can be one of the predefined keys (`user_details`, `auto_debit_details`) 
 *                       or a string in the `day-month-year` format (e.g., '15-04-2024').
 * @returns {Object} response - The response object containing the result of the read operation.
 * @returns {number} response.code - The status code indicating the result of the operation (e.g., `statusCode.SUCCESS`, `statusCode.FILE_NOT_FOUND`).
 * @returns {string} response.message - A message describing the result of the operation (e.g., success or error message).
 * @returns {Object} [response.data] - The data that was read from the file, only included if the read was successful.
 *
 * @example
 * // Example for reading data for a specific date:
 * const response = readKey('15-04-2024');
 * console.log(response);
 *
 * @example
 * // Example for the special case: user_details
 * const response = readKey('user_details');
 * console.log(response);
 *
 * @example
 * // Example for the special case: auto_debit_details
 * const response = readKey('auto_debit_details');
 * console.log(response);
 */
const readKey = (key = null) => {
    var response = RESPONSE_TEMPLATE;
    response.code = statusCode.INVALID_PARAMETER;
    response.message = 'Error reading file';

    const ret = isValidKey(key);
    if (ret.code != statusCode.SUCCESS) {
        return ret;
    }

    if (key.toLowerCase() === 'user_details') {
        response = readUserDetails();
        return response;
    }

    if (key.toLowerCase() === 'auto_debit_details') {
        response = readAutoDebitDetails();
        return response;
    }

    response = readDateData(key);
    return response;
}

/**
 * Writes the provided data to a file based on the specified key. 
 * The function handles predefined keys like 'user_details' and 'auto_debit_details' by calling specific helper functions. 
 * For other keys, it dynamically creates the necessary folder structure based on a 'day-month-year' formatted key and writes the data to a corresponding file.
 * 
 * @param {string} key - The identifier for the file to write. This can be one of the predefined keys ('user_details', 'auto_debit_details') or a string in 'day-month-year' format (e.g., '15-04-2024').
 * @param {Object} data - The data to be written to the file. Must be an object.
 * @returns {Object} response - The response object containing the result of the write operation.
 * @returns {number} response.code - The status code indicating the result of the operation (e.g., `statusCode.SUCCESS`, `statusCode.ERROR`).
 * @returns {string} response.message - A message describing the result of the operation (e.g., success or error message).
 * @returns {Object} [response.data] - None.
 *
 * @example
 * // Example for writing data to a dynamic file:
 * const response = writeKey('15-04-2024', { expense: 100, category: 'food' });
 * console.log(response);
 *
 * @example
 * // Example for the special case: user_details
 * const response = writeKey('user_details', { name: 'John Doe', age: 30 });
 * console.log(response);
 *
 * @example
 * // Example for the special case: auto_debit_details
 * const response = writeKey('auto_debit_details', { bank: 'XYZ Bank', amount: 500 });
 * console.log(response);
 */
const writeKey = (key = null, data = null) => {
    var response = RESPONSE_TEMPLATE;
    response.code = statusCode.INVALID_PARAMETER;
    response.message = 'Error writing file';

    const ret = isValidKey(key);
    if (ret.code !== statusCode.SUCCESS) {
        return ret;
    }

    if (key.toLowerCase() === 'user_details') {
        response = writeUserDetails(data);
        return response;
    }

    if (key.toLowerCase() === 'auto_debit_details') {
        response = writeAutoDebitsDetails(data);
        return response;
    }

    if (data === null || typeof data !== 'object') {
        response.code = statusCode.INVALID_PARAMETER;
        response.message = 'Invalid data format. Data should be an object.';
        return response;
    }

    response = writeDateData(key, data);
    return response;
};

module.exports = {
    readKey,
    writeKey
};