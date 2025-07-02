const path = require("path");

console.log(__filename);
console.log(path.basename(__filename));
console.log(path.basename(__filename, ".js"));

let result = path.format({
  base: "sample.text",
  dir: "/home/temp",
});
console.log(result);

result = path.parse("/home/temp/sample.text");
console.log(result);
