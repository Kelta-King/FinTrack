const statusCode = require("./statusCode");
const path = require("path");
const fs = require("fs");
const LOGGER = require("../../../Logger/logger");

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
    response.message = 'Invalid key format. Please use operation#dd-mm-yyyy format.';
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

    if (key.toLowerCase() === 'total_details') {
        response.code = statusCode.SUCCESS;
        response.message = 'Valid key provided';
        return response;
    }

    const regex = /^[\w\-\_]+#\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(key)) {
        return response;
    }

    key = key.split("#")[1];

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

const readTotalDetails = () => {
    var response = RESPONSE_TEMPLATE;
    const totalDetailsFilePath = path.join(dbPath, `totalDetails.json`);

    if (!fs.existsSync(totalDetailsFilePath)) {
        response.code = statusCode.KEY_NOT_FOUND;
        response.message = `Total details file not found.`;
        return response;
    }

    try {
        response.data = JSON.parse(fs.readFileSync(totalDetailsFilePath, 'utf8'));
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
        const autoDebitsDetailsFilePath = path.join(dbPath, `autoDebitDetails.json`);

        if (!fs.existsSync(autoDebitsDetailsFilePath)) {
            LOGGER.debug(`File does not exist: ${autoDebitsDetailsFilePath}. Creating...`);
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

const writeTotalDetails = (data = null) => {
    var response = RESPONSE_TEMPLATE;

    if (data === null) {
        response.code = statusCode.INVALID_PARAMETER;
        response.message = 'No data provided to write.';
        return response;
    }

    try {
        const totalDetailsFilePath = path.join(dbPath, `totalDetails.json`);

        if (!fs.existsSync(totalDetailsFilePath)) {
            LOGGER.debug(`File does not exist: ${totalDetailsFilePath}`);
        }

        fs.writeFileSync(totalDetailsFilePath, JSON.stringify(data, null, 2), 'utf8');
        response.code = statusCode.SUCCESS;
        response.message = 'File written successfully';
    }
    catch (error) {
        response.code = statusCode.ERROR;
        response.message = 'Error writing file: ' + error.message;
    }

    return response;
}

const readMonthData = (key = null) => {
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

        const monthlyFilePath = path.join(monthFolderPath, `details.json`);
        if (!fs.existsSync(monthlyFilePath)) {
            response.code = statusCode.KEY_NOT_FOUND;
            response.message = `Monthly details file for ${key} not found.`;
            return response;
        }

        response.data = JSON.parse(fs.readFileSync(monthlyFilePath, 'utf8'));
        response.code = statusCode.SUCCESS;
        response.message = 'File read successfully';
    }
    catch (error) {
        response.code = statusCode.ERROR;
        response.message = 'Error reading file: ' + error.message;
    }
    return response;
}

const readYearData = (key = null) => {
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

        const yearlyFilePath = path.join(yearFolderPath, `details.json`);
        if (!fs.existsSync(yearlyFilePath)) {
            response.code = statusCode.KEY_NOT_FOUND;
            response.message = `Yearly details file for ${key} not found.`;
            return response;
        }

        response.data = JSON.parse(fs.readFileSync(yearlyFilePath, 'utf8'));
        response.code = statusCode.SUCCESS;
        response.message = 'File read successfully';
    }
    catch (error) {
        response.code = statusCode.ERROR;
        response.message = 'Error reading file: ' + error.message;
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

const writeMonthData = (key = null, data = null) => {
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

        const monthlyFilePath = path.join(monthFolderPath, `details.json`);

        fs.writeFileSync(monthlyFilePath, JSON.stringify(data, null, 2), 'utf8');
        response.code = statusCode.SUCCESS;
        if (count > 0) {
            response.message = `Monthly details file for ${key} created and written successfully. ${count} new directory(ies) created.`;
        }
        else {
            response.message = `Monthly details file for ${key} written successfully.`;
        }
    }
    catch (error) {
        response.code = statusCode.ERROR;
        response.message = `Error writing file: ${error.message}`;
    }
    return response;
}

const writeYearData = (key = null, data = null) => {
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

        const yearlyFilePath = path.join(yearFolderPath, `details.json`);

        fs.writeFileSync(yearlyFilePath, JSON.stringify(data, null, 2), 'utf8');
        response.code = statusCode.SUCCESS;
        if (count > 0) {
            response.message = `Yearly details file for ${key} created and written successfully. ${count} new directory(ies) created.`;
        }
        else {
            response.message = `Yearly details file for ${key} written successfully.`;
        }
    }
    catch (error) {
        response.code = statusCode.ERROR;
        response.message = `Error writing file: ${error.message}`;
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
            response.message = `Daily details file for ${key} created and written successfully. ${count} new directory(ies) created.`;
        }
        else {
            response.message = `Daily details file for ${key} written successfully.`;
        }
    }
    catch (error) {
        response.code = statusCode.ERROR;
        response.message = `Error writing file: ${error.message}`;
    }
    return response;
}

/**
 * Reads data based on the provided key and returns a response with the corresponding details.
 * 
 * This function processes a given `key` to retrieve specific data. The key can represent different types
 * of details such as user details, auto-debit details, or total details. The function also supports additional
 * operations based on key formats, such as monthly, yearly, and daily details.
 * 
 * If the key is invalid or incorrectly formatted, the function will return an error message indicating the issue.
 * 
 * @param {string|null} key - The key to read the associated details. If `null`, the default error response is returned.
 *                             The key can be one of the following:
 *                             - 'user_details'  
 *                             - 'auto_debit_details'  
 *                             - 'total_details'  
 *                             - A key in the format of `<operation>#<operationKey>`, where:
 *                               - `operation` can be 'monthly_details', 'yearly_details', or 'daily_details'
 *                               - `operationKey` is the specific identifier for that operation.
 * 
 * @returns {Object} The response object, which will contain:
 * - `code`: Status code indicating the result of the operation (e.g., success or error).
 * - `message`: A message describing the result or error.
 * - `data`: Depending on the key and operation, the returned data may vary:
 *     - For valid operations, returns the corresponding data (e.g., user details, auto-debit details, etc.).
 *     - For invalid keys or operations, an error message is returned.
 * 
 * @example
 * // Example 1: Valid key for user details
 * const response = readKey('user_details');
 * console.log(response.data); // Returns user details data
 * 
 * // Example 2: Invalid key format
 * const response = readKey('invalid_key');
 * console.log(response.message); // Returns "Invalid key format. Need to specify the operation"
 * 
 * // Example 3: Monthly details with operation key
 * const response = readKey('monthly_details#2024-10');
 * console.log(response.data); // Returns the monthly details for October 2024
 * 
 * @throws {Error} If any unexpected error occurs while reading data.
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

    if (key.toLowerCase() === 'total_details') {
        response = readTotalDetails();
        return response;
    }

    if(!key.includes("#")) {
        response.code = statusCode.INVALID_PARAMETER;
        response.message = 'Invalid key format. Need to specify the operation';
        return response;
    }

    const [operation, operationKey] = key.split('#');

    switch(operation) {

        case 'monthly_details': 
            response = readMonthData(operationKey);
            break;
        
        case 'yearly_details':
            response = readYearData(operationKey);
            break;

        case 'daily_details':
            response = readDateData(operationKey);
            break;
        
        default:
            response.code = statusCode.INVALID_PARAMETER;
            response.message = 'Invalid operation provided: ' + operation;

    }

    return response;
}

/**
 * Writes data to the specified key and operation, and returns a response indicating the result.
 * 
 * This function processes the provided `key` and `data` to write or update details. The key can represent
 * different types of data such as user details, auto-debit details, total details, or other operations based on the key format.
 * 
 * If the key or data is invalid, the function will return an error message indicating the problem.
 * 
 * @param {string|null} key - The key indicating the type of data to write. If `null`, the default error response is returned.
 *                             The key can be one of the following:
 *                             - 'user_details'
 *                             - 'auto_debit_details'
 *                             - 'total_details'
 *                             - A key in the format `<operation>#<operationKey>`, where:
 *                               - `operation` can be 'monthly_details', 'yearly_details', or 'daily_details'
 *                               - `operationKey` is the specific identifier for that operation.
 * @param {Object|null} data - The data to be written. Must be an object if provided. If `null` or of an invalid type, an error will be returned.
 * 
 * @returns {Object} The response object, which will contain:
 * - `code`: Status code indicating the result of the operation (e.g., success or error).
 * - `message`: A message describing the result or error.
 * - `data`: The data that was written, if the operation was successful, or an error message if something went wrong.
 * 
 * @example
 * // Example 1: Write user details
 * const response = writeKey('user_details', { name: 'John Doe', email: 'john.doe@example.com' });
 * console.log(response.code); // Returns success status
 * 
 * // Example 2: Invalid data format (not an object)
 * const response = writeKey('user_details', 'Invalid data');
 * console.log(response.message); // Returns "Invalid data format. Data should be an object."
 * 
 * // Example 3: Monthly details with operation key and valid data
 * const response = writeKey('monthly_details#2024-10', { expenses: 1000, income: 2000 });
 * console.log(response.code); // Returns success or error depending on the write operation
 * 
 * @throws {Error} If any unexpected error occurs while writing data.
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

    if (key.toLowerCase() === 'total_details') {
        response = writeTotalDetails(data);
        return response;
    }

    if (data === null || typeof data !== 'object') {
        response.code = statusCode.INVALID_PARAMETER;
        response.message = 'Invalid data format. Data should be an object.';
        return response;
    }

    if(!key.includes("#")) {
        response.code = statusCode.INVALID_PARAMETER;
        response.message = 'Invalid key format. Need to specify the operation.';
        return response;
    }

    const [operation, operationKey] = key.split('#');

    switch(operation) {

        case 'monthly_details': 
            response = writeMonthData(operationKey, data);
            break;
        
        case 'yearly_details':
            response = writeYearData(operationKey, data);
            break;

        case 'daily_details':
            response = writeDateData(operationKey, data);
            break;
        
        default:
            response.code = statusCode.INVALID_PARAMETER;
            response.message = 'Invalid operation provided: ' + operation;

    }
    return response;
}

/**
 * Resets the database by deleting the contents of the database.
 * 
 * This function removes the database directory.
 * It returns a response object indicating whether the operation was successful or not. 
 * 
 * @function
 * @returns {Object} response - The response object with the result of the operation.
 * @returns {number} response.code - The status code indicating success or failure.
 * @returns {string} response.message - A message describing the outcome of the operation.
 * @returns {null|Error} response.data - Either `null` if successful or an `Error` object if an error occurred.
 * 
 * @throws {Error} If an error occurs during the database reset process, an error will be thrown.
 * 
 * @example
 * const result = resetDB();
 * console.log(result);
 * // Output if successful:
 * // {
 * //   code: 0,
 * //   message: 'Database reset successful',
 * //   data: null
 * // }
 * 
 * @example
 * const result = resetDB();
 * console.log(result);
 * // Output if failed:
 * // {
 * //   code: 4,
 * //   message: 'Permission denied',
 * //   data: { Error: 'Permission denied' }
 * // }
 */
const resetDB = () => {
    var response = RESPONSE_TEMPLATE;
    try {
        fs.rmSync(dbPath, { recursive: true, force: true });
        fs.mkdirSync(dbPath);
        response.code = statusCode.SUCCESS;
        response.message = 'Database reset successful';
        response.data = null;
    } 
    catch (error) {
        response.code = statusCode.ERROR;
        response.message = error.message;
        response.data = error;
    }
    return response;
}

module.exports = {
    readKey,
    writeKey,
    resetDB
};