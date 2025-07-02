// promise.js
// 서버에 페이지를 호출하고 결과를 받아올 때 실행되는 함수
const promise = new Promise(function (resolve, reject) {
  // resolve("ok");  성공. 근데 그냥 순서임. 첫 번째가 성공, 두 번째가 실패.
  // reject("error"); 실패. 꼭 문자열이 아니더라도 객체도 올 수 있음.
  // setTimeout (함수, 지연시간 1000 = 1초)가 지나면 안의 함수를 실행함.
  let run = parseInt(Math.random() * 2);
  // falsy -> 0, null, "", undefied 이외에는 truty.
  setTimeout(function () {
    if (run) {
      resolve({ id: "user", name: "회원" });
    } else {
      reject(new Error("에러호출"));
    }
  }, 1000);
});

promise // 정상적으로 실행되면 then 실행.
  .then(function (result) {
    console.log(result); // ok
  })
  .catch(function (err) {
    console.log(err); // error
  });

fetch(
  "https://charleslee-6617723.postman.co/workspace/3461b914-2d4f-41c9-8c64-f24308da11f5/request/45560951-edf6f244-dc04-42e6-a962-02a67c0332d1?action=share&source=copy-link&creator=45560951&ctx=documentation"
)
  .then((data) => data.json())
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log("err"));
