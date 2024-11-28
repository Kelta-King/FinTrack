const statusCode = require("./statusCode");
const path = require("path");
const fs = require("fs");

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

const readFile = (key = null) => {
    var response = RESPONSE_TEMPLATE;
    response.code = statusCode.INVALID_PARAMETER;
    response.message = 'Error reading file';
    const ret = isValidKey(key);
    if (ret.code != statusCode.SUCCESS) {
        return ret;
    }
    const [day, month, year] = key.split('-').map(Number);

    const yearFolderPath = path.join(dbPath, year.toString());
    if (!directoryExists(yearFolderPath)) {
        response.code = statusCode.FILE_NOT_FOUND;
        response.message = `Year folder ${year} not found.`;
        return response;
    }

    const monthFolderPath = path.join(yearFolderPath, month.toString().padStart(2, '0'));
    if (!directoryExists(monthFolderPath)) {
        response.code = statusCode.FILE_NOT_FOUND;
        response.message = `Month folder ${month.toString().padStart(2, '0')} not found.`;
        return response;
    }

    const expenseFilePath = path.join(monthFolderPath, `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}.json`);
    if (!fs.existsSync(expenseFilePath)) {
        response.code = statusCode.FILE_NOT_FOUND;
        response.message = `Expense file for ${key} not found.`;
        return response;
    }

    try {
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

const writeFile = (key = null, data = null) => {
    var response = RESPONSE_TEMPLATE;
    response.code = statusCode.INVALID_PARAMETER;
    response.message = 'Error writing file';

    const ret = isValidKey(key);
    if (ret.code !== statusCode.SUCCESS) {
        return ret;
    }

    if (data === null || typeof data !== 'object') {
        response.code = statusCode.INVALID_PARAMETER;
        response.message = 'Invalid data format. Data should be an object.';
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
        if(count > 0) {
            response.message = `Expense file for ${key} created and written successfully. ${count} new directory(ies) created.`;
        } else {
            response.message = `Expense file for ${key} written successfully.`;
        }
        response.data = data;
    }
    catch (error) {
        response.code = statusCode.ERROR;
        response.message = `Error writing file: ${error.message}`;
    }

    return response;
};


module.exports = {
    readFile,
    writeFile
};