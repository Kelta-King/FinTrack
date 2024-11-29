const db = require("./dbInterface")(); // Getting db instance from db interface

// console.log(db.writeKey("", {"auto_debit_details": 123}));

// const ret = db.writeKey("12-12-9999", {
//     "Hello": "world"
// });

// console.log(ret);


console.log(db.readKey("30-12-3333"));