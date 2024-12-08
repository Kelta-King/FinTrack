const JsonDBInterface = require("./JsonDBInterface/jsonDBInterface");
const { DAILY_DETAILS_OBJECT_TEMPLATE } = require("./MACROS/MACROS");

console.log(JsonDBInterface.getExpensesInRange("07-12-2024", "11-12-2024"));