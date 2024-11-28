const db = require("./jsonDB");

console.log(db.readFile("31-12-3333"));

const ret = db.writeFile("31-12-3333", {
    "Hello": "world"
});

console.log(ret);


console.log(db.readFile("31-12-3333"));