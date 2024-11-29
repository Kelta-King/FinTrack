const db = require("./jsonDB");

console.log(db.writeKey("user_details", {"auto_debit_details": 123}));

// const ret = db.writeKey("31-12-3333", {
//     "Hello": "world"
// });

// console.log(ret);


console.log(db.readKey("31-12-3333"));