const EXPENSES_CATEGORIES = Object.freeze({
    "Investment": ['SIP', 'Lumpsum_MF', 'FD_Bank', 'PPF', 'Tax_Saver_MF_ELSS', 'Other'],
    "Necessary": ['Housekeeping', 'House_Rent', 'Utilities', 'Groceries', 'Fuel_Transportation', 'Medical', 'Other'],
    'Non_Necessary': ['Shopping', 'Dining', 'Entertainment', 'Travel', 'Hobbies', 'Gifts_Charity', 'Fitness_Wellness', 'Luxury', 'Other']
});

const EXPENSES_CATEGORIES_UI_MAPPING = Object.freeze({
    "Investment": 'Investment',
    "Necessary": 'Necessary',
    'Non_Necessary': 'Non-Necessary',
});

const EXPENSES_SUB_CATEGORIES_UI_MAPPING = Object.freeze({
    'SIP': 'SIP',
    'Lumpsum MF': 'Lumpsum_MF', 
    'FD / Bank': 'FD_Bank',
    'PPF': 'PPF',
    'Tax Saver MF (ELSS)': 'Tax_Saver_MF_ELSS',
    'Housekeeping': 'Housekeeping',
    'House Rent': 'House_Rent',
    'Utilities': 'Utilities',
    'Groceries': 'Groceries',
    'Fuel/Transportation': 'Fuel_Transportation',
    'Medical': 'Medical',
    'Shopping': 'Shopping',
    'Dining': 'Dining',
    'Entertainment': 'Entertainment',
    'Travel': 'Travel',
    'Hobbies': 'Hobbies', 
    'Gifts/Charity': 'Gifts_Charity',
    'Fitness/Wellness': 'Fitness_Wellness',
    'Luxury': 'Luxury',
    'Other': 'Other'
});

// Below are the templates for JsonDB file storing
const USER_DETAILS_OBJECT_TEMPLATE = {
    "user_id": null,
    "name": null,
    "email": null,
    "balance": null,
    "currency": null
};

const AUTO_DEBIT_DETAILS_OBJECT_TEMPLATE = {
    "total_auto_debit_amount": null,
    "total_auto_debit_count": null,
    "total_auto_debit_investment": null,
    "total_auto_debit_necessary": null,
    "total_auto_debit_non_necessary": null,
    "auto_debit_list": []
};

const AUTO_DEBIT_SINGLE_OBJECT_TEMPLATE = {
    "amount": null,
    "category": null,
    "subcategory": null,
    "title": null,
    "description": null,
    "due_date": null,
    "frequency": null,
}

const TOTAL_DETAILS_OBJECT_TEMPLATE = {
    "total_expenses": null,
    "total_investment": null,
    "total_necessary": null,
    "total_non_necessary": null,
};

const YEARLY_DETAILS_OBJECT_TEMPLATE = {
    "total_expenses": null,
    "total_investment": null,
    "total_necessary": null,
    "total_non_necessary": null,
};

const MONTHLY_DETAILS_OBJECT_TEMPLATE = {
    "total_expenses": null,
    "total_investment": null,
    "total_necessary": null,
    "total_non_necessary": null,
};

const DAILY_DETAILS_OBJECT_TEMPLATE = {
    "total_expenses": null,
    "total_investment": null,
    "total_necessary": null,
    "total_non_necessary": null,
    "expenses_list": [],
};

const EXPENSE_SINGLE_OBJECT_TEMPLATE = {
    "amount": null,
    "category": null,
    "sub_category": null,
    "title": null,
    "description": null,
    "date": null
};

EXPENSES_CATEGORIES.Investment.forEach((invest_sub_category, index) => {
    TOTAL_DETAILS_OBJECT_TEMPLATE[`total_${invest_sub_category}_investments`] = null;
    AUTO_DEBIT_DETAILS_OBJECT_TEMPLATE[`total_${invest_sub_category}_investments`] = null;
    YEARLY_DETAILS_OBJECT_TEMPLATE[`total_${invest_sub_category}_investments`] = null;
    MONTHLY_DETAILS_OBJECT_TEMPLATE[`total_${invest_sub_category}_investments`] = null;
    DAILY_DETAILS_OBJECT_TEMPLATE[`total_${invest_sub_category}_investments`] = null;
});

EXPENSES_CATEGORIES.Necessary.forEach((necessary_sub_category, index) => {
    TOTAL_DETAILS_OBJECT_TEMPLATE[`total_${necessary_sub_category}_necessary_expenses`] = null;
    AUTO_DEBIT_DETAILS_OBJECT_TEMPLATE[`total_${necessary_sub_category}_necessary_expenses`] = null;
    YEARLY_DETAILS_OBJECT_TEMPLATE[`total_${necessary_sub_category}_necessary_expenses`] = null;
    MONTHLY_DETAILS_OBJECT_TEMPLATE[`total_${necessary_sub_category}_necessary_expenses`] = null;
    DAILY_DETAILS_OBJECT_TEMPLATE[`total_${necessary_sub_category}_necessary_expenses`] = null;
});

EXPENSES_CATEGORIES.Non_Necessary.forEach((non_necessary_sub_category, index) => {
    TOTAL_DETAILS_OBJECT_TEMPLATE[`total_${non_necessary_sub_category}_non_necessary_expenses`] = null;
    AUTO_DEBIT_DETAILS_OBJECT_TEMPLATE[`total_${non_necessary_sub_category}_non_necessary_expenses`] = null;
    YEARLY_DETAILS_OBJECT_TEMPLATE[`total_${non_necessary_sub_category}_non_necessary_expenses`] = null;
    MONTHLY_DETAILS_OBJECT_TEMPLATE[`total_${non_necessary_sub_category}_non_necessary_expenses`] = null;
    DAILY_DETAILS_OBJECT_TEMPLATE[`total_${non_necessary_sub_category}_non_necessary_expenses`] = null;
});

const MONTHS = Object.freeze({
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
});

const MONTHS_MAPPING = Object.freeze({
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
});

const ERROR_CODES = Object.freeze({
    NONE: 0,
    INVALID_INPUT: 1,
    NOT_FOUND: 2,
    ALREADY_EXISTS: 3,
    SERVER_ERROR: 4,
});

const SPECIFICATION_DATA = Object.freeze({
    MAX_RECENT_TRANSACTION_COUNT: 10,
    MAX_TRY_FOR_RECENT_TRANSACTION_COUNT: 40, // Checks this much dates before stopping
    MAX_MONTH_LIMIT_FOR_OVERVIEW: 12, 
});

Object.freeze(USER_DETAILS_OBJECT_TEMPLATE);
Object.freeze(AUTO_DEBIT_DETAILS_OBJECT_TEMPLATE);
Object.freeze(AUTO_DEBIT_SINGLE_OBJECT_TEMPLATE);
Object.freeze(TOTAL_DETAILS_OBJECT_TEMPLATE);
Object.freeze(YEARLY_DETAILS_OBJECT_TEMPLATE);
Object.freeze(MONTHLY_DETAILS_OBJECT_TEMPLATE);
Object.freeze(DAILY_DETAILS_OBJECT_TEMPLATE);
Object.freeze(EXPENSE_SINGLE_OBJECT_TEMPLATE);

module.exports = {
    USER_DETAILS_OBJECT_TEMPLATE,
    AUTO_DEBIT_DETAILS_OBJECT_TEMPLATE,
    TOTAL_DETAILS_OBJECT_TEMPLATE,
    YEARLY_DETAILS_OBJECT_TEMPLATE,
    MONTHLY_DETAILS_OBJECT_TEMPLATE,
    DAILY_DETAILS_OBJECT_TEMPLATE,
    EXPENSE_SINGLE_OBJECT_TEMPLATE,
    AUTO_DEBIT_SINGLE_OBJECT_TEMPLATE,
    EXPENSES_CATEGORIES,
    EXPENSES_CATEGORIES_UI_MAPPING,
    EXPENSES_SUB_CATEGORIES_UI_MAPPING,
    MONTHS,
    MONTHS_MAPPING,
    ERROR_CODES,
    SPECIFICATION_DATA
}