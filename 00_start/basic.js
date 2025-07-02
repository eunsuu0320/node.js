const { members, add, getPerson } = require("./data.js");

// console.log("Hello World");
// 명령 프롬포트에서 실행 가능 -> dev, git, node 에서 node 파일명
// 보기 -> 터미널에서 node basic 해서도 가능

let myName = "최은수";
let age = 20;

if (age >= 20) {
  // console.log(`${myName}은 성인입니다.`);
} else {
  // console.log(`${myName}은 미성년자입니다.`);
}
// console.log(members);
// console.log(add(10, 20));

members.forEach((item, idx) => {
  // function(item, idx, array) 매개값
  if (idx > 0) {
    // console.log(item);
  }
});

// 펼침연산자
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let result = [...arr1, ...arr2]; // 배열 합침
let result2 = [arr1, arr2]; // 배열과 배열을 출력
// console.log(result);
// console.log(result2);

// object destructuring
let { firstName, lastName, email } = getPerson(); // {firstName, lastName, ....} 각각의 속성들을 선언해주면 변수의 값이 담김
// console.log(firstName, lastName, email);

// array destructurting
function getScores() {
  return [70, 80, 90, 50, 60, 40];
}
let [x, y, ...z] = getScores();
console.log(x, y, z);

// 파라미터의 개수를 알 수 없다.
function sumAry(...arr) {
  let sum = 0;
  for (let num of arr) {
    sum += num;
  }
  console.log(`합계: ${sum}`);
}
sumAry(1, 2, 3, 4, 5, 6, 7, 8);
