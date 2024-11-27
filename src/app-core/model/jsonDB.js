const fs = require('fs');
const path = require('path');
const STATUS_CODES = require("./statusCode");

// Define the path to the JSON file (database)
const dbFilePath = path.join(__dirname, 'DB/database.json');

// Predefined structure of the database
const defaultDBStructure = {
    account_details: {
        user_id: '',
        name: '',
        email: '',
        balance: 0.00,
        currency: 'USD'
    },
    expenses_history: {},
    auto_debits: []
};

// Check if the database file exists
const isDBExist = () => fs.existsSync(dbFilePath);

// Create the database with the predefined structure
const createDB = () => {
    if (isDBExist()) {
        return STATUS_CODES.DB_ALREADY_EXISTS;
    }

    // Create the database file with the default structure
    fs.writeFileSync(dbFilePath, JSON.stringify(defaultDBStructure, null, 2));
    return STATUS_CODES.SUCCESS;
};

// Delete the database
const deleteDB = () => {
    if (!isDBExist()) {
        return STATUS_CODES.DB_NOT_EXIST;
    } 
    else {
        fs.unlinkSync(dbFilePath);
        return STATUS_CODES.DB_DELETED;
    }
};

// Read the entire database from the JSON file
const readDB = (obj = null) => {
    if (!isDBExist()) {
        return STATUS_CODES.DB_NOT_EXIST;
    }
    if(obj == null) {
        return STATUS_CODES.INVALID_PARAMETER;
    }
    const data = fs.readFileSync(dbFilePath);
    obj = JSON.parse(data);
    return STATUS_CODES.SUCCESS;
};

// Write the updated data back to the database file
const writeDB = (data = null) => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// Get a value by its key path (e.g., "account_details#user_id")
const getKey = (keyPath) => {
    const keys = keyPath.split('#');
    let db = readDB();
    if (!db) return { status: STATUS_CODES.DB_NOT_EXIST, value: null };

    for (const key of keys) {
        if (db[key] === undefined) {
            return { status: STATUS_CODES.KEY_NOT_FOUND, value: null };
        }
        db = db[key];
    }

    return { status: STATUS_CODES.SUCCESS, value: db };
};

// Set a value by its key path (e.g., "account_details#user_id")
const setKey = (keyPath, value) => {
    const keys = keyPath.split('#');
    let db = readDB();
    if (!db) return STATUS_CODES.DB_NOT_EXIST;

    let currentKey = keys[0];
    for (let i = 1; i < keys.length; i++) {
        if (!db[currentKey]) {
            db[currentKey] = {}; // Create intermediate object if it doesn't exist
        }
        db = db[currentKey];
        currentKey = keys[i];
    }

    db[currentKey] = value; // Set the final value
    writeDB(readDB()); // Write the updated data back to the file
    return STATUS_CODES.SUCCESS;
};

// Check if a key exists at a specific path
const isKeyExist = (keyPath) => {
    const keys = keyPath.split('#');
    let db = readDB();
    if (!db) return false;

    for (const key of keys) {
        if (db[key] === undefined) {
            return false;
        }
        db = db[key];
    }

    return true;
};

// Check if the database is corrupted (missing any essential fields)
const isCorrupted = () => {
    const db = readDB();
    if (!db) return true; // If DB doesn't exist or can't be read, it's corrupted

    // Check if any required top-level field is missing
    if (!db.account_details || !db.expenses_history || !db.auto_debits) {
        return true;
    }

    // Check if essential fields inside account_details are missing
    const accountDetails = db.account_details;
    if (!accountDetails.user_id || !accountDetails.name || !accountDetails.email) {
        return true;
    }

    return false;
};

module.exports = {
    createDB,
    deleteDB,
    getKey,
    setKey,
    isDBExist,
    isKeyExist,
    isCorrupted
};
