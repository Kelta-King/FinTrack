const db = require("./JsonDB/jsonDB"); // Getting db instance from db interface
const {DAILY_DETAILS_OBJECT_TEMPLATE} = require("./MACROS/MACROS");
// console.log(db.writeKey("", {"auto_debit_details": 123}));
var data = DAILY_DETAILS_OBJECT_TEMPLATE;
console.log(Object.keys(data));

const ret = db.writeKey("daily_details#07-12-2024", {
    
});

console.log(ret);


// console.log(db.readKey("dd#31-12-3333"));