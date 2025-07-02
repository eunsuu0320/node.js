const fs = require("fs");

console.log("start");

// 1. 비동기방식
// fs.readFile("./sample/output.log", "utf8", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// });
// console.log("end");

// 2.동기방식
// let data = fs.readFileSync("./sample/output.log", "utf8");
// console.log(data);

fs.writeFile("./sample/write.txt", "글쓰기...", "utf8", (err) => {
  if (err) {
    throw err;
  }
  console.log("쓰기 완료");
});
console.log("end");
