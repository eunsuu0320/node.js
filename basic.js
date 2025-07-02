const { members, add } = require("./data.js");

console.log("Hello World");
// 명령 프롬포트에서 실행 가능 -> dev, git, node 에서 node 파일명
// 보기 -> 터미널에서 node basic 해서도 가능

let myName = "최은수";
let age = 20;

if (age >= 20) {
  console.log(`${myName}은 성인입니다.`);
} else {
  console.log(`${myName}은 미성년자입니다.`);
}

// console.log(members);
// console.log(add(10, 20));

members.forEach((item, idx) => {
  // function(item, idx, array) 매개값
  if (idx > 0) {
    console.log(item);
  }
});
