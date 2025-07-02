const { Console } = require("console");
const fs = require("fs");
const express = require("express"); // 외부 모듈. -> 설치해야 쓸 수 있음 npm install express

// sample폴더 하위에 output.log 파일 생성
const output = fs.createWriteStream("./sample/output.log", { flags: "a" });
// sample폴더 하위에 errlog.log 파일 생성
const errlog = fs.createWriteStream("./sample/errlog.log", { flags: "a" });

const logger = new Console({
  stdout: output,
  stderr: errlog,
});

logger.log("로그 기록하기");
logger.error("에러 로그 기록하기");
console.log("end ");
