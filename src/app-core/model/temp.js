const db = require("./dataInterface")(); // Getting db instance from db interface

// console.log(db.writeKey("", {"auto_debit_details": 123}));

const ret = db.writeKey("yearly_details#12-12-9999", {
    "Hello": "world"
});

console.log(ret);


// console.log(db.readKey("dd#31-12-3333"));