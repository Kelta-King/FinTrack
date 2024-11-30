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
    'Lumpsum_MF': 'Lumpsum MF', 
    'FD_Bank': 'FD / Bank',
    'PPF': 'PPF',
    'Tax_Saver_MF_ELSS': 'Tax Saver MF (ELSS)',
    'Housekeeping': 'Housekeeping',
    'House_Rent': 'House Rent',
    'Utilities': 'Utilities',
    'Groceries': 'Groceries',
    'Fuel_Transportation': 'Fuel/Transportation',
    'Medical': 'Medical',
    'Shopping': 'Shopping',
    'Dining': 'Dining',
    'Entertainment': 'Entertainment',
    'Travel': 'Travel',
    'Hobbies': 'Hobbies', 
    'Gifts_Charity': 'Gifts/Charity',
    'Fitness_Wellness': 'Fitness/Wellness',
    'Luxury': 'Luxury',
    'Other': 'Other'
});

const USER_DETAILS_OBJECT_TEMPLATE = {
    "user_id": null,
    "name": null,
    "email": null,
    "balance": null,
    "currency": null
};

const AUTO_DEBIT_DETAILS_OBJECT_TEMPLATE = {
    "debit_id": null,
    "amount": null,
    "category": null,
    "subcategory": null,
    "title": null,
    "description": null,
    "due_date": null,
    "frequency": null,
    "status": null
};

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

EXPENSES_CATEGORIES.Investment.forEach((invest_sub_category, index) => {
    TOTAL_DETAILS_OBJECT_TEMPLATE[`total_${invest_sub_category}_investments`] = null;
    YEARLY_DETAILS_OBJECT_TEMPLATE[`total_${invest_sub_category}_investments`] = null;
    MONTHLY_DETAILS_OBJECT_TEMPLATE[`total_${invest_sub_category}_investments`] = null;
    DAILY_DETAILS_OBJECT_TEMPLATE[`total_${invest_sub_category}_investments`] = null;
});

EXPENSES_CATEGORIES.Necessary.forEach((necessary_sub_category, index) => {
    TOTAL_DETAILS_OBJECT_TEMPLATE[`total_${necessary_sub_category}_necessary_expenses`] = null;
    YEARLY_DETAILS_OBJECT_TEMPLATE[`total_${necessary_sub_category}_necessary_expenses`] = null;
    MONTHLY_DETAILS_OBJECT_TEMPLATE[`total_${necessary_sub_category}_necessary_expenses`] = null;
    DAILY_DETAILS_OBJECT_TEMPLATE[`total_${necessary_sub_category}_necessary_expenses`] = null;
});

EXPENSES_CATEGORIES.Non_Necessary.forEach((non_necessary_sub_category, index) => {
    TOTAL_DETAILS_OBJECT_TEMPLATE[`total_${non_necessary_sub_category}_non_necessary_expenses`] = null;
    YEARLY_DETAILS_OBJECT_TEMPLATE[`total_${non_necessary_sub_category}_non_necessary_expenses`] = null;
    MONTHLY_DETAILS_OBJECT_TEMPLATE[`total_${non_necessary_sub_category}_non_necessary_expenses`] = null;
    DAILY_DETAILS_OBJECT_TEMPLATE[`total_${non_necessary_sub_category}_non_necessary_expenses`] = null;
});

Object.freeze(USER_DETAILS_OBJECT_TEMPLATE);
Object.freeze(AUTO_DEBIT_DETAILS_OBJECT_TEMPLATE);
Object.freeze(TOTAL_DETAILS_OBJECT_TEMPLATE);
Object.freeze(YEARLY_DETAILS_OBJECT_TEMPLATE);
Object.freeze(MONTHLY_DETAILS_OBJECT_TEMPLATE);
Object.freeze(DAILY_DETAILS_OBJECT_TEMPLATE);

module.exports = {
    USER_DETAILS_OBJECT_TEMPLATE,
    AUTO_DEBIT_DETAILS_OBJECT_TEMPLATE,
    TOTAL_DETAILS_OBJECT_TEMPLATE,
    YEARLY_DETAILS_OBJECT_TEMPLATE,
    MONTHLY_DETAILS_OBJECT_TEMPLATE,
    DAILY_DETAILS_OBJECT_TEMPLATE,
    EXPENSES_CATEGORIES,
    EXPENSES_CATEGORIES_UI_MAPPING,
    EXPENSES_SUB_CATEGORIES_UI_MAPPING
}