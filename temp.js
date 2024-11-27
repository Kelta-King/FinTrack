function updateVal(obj) {
    obj["hello"] = "world";
}

var obj = {
    "No": "Ho"
};

updateVal(obj);

console.log(obj);