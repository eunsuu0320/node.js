const express = require("express");
require("dotenv").config({ path: "./mysql/.env" });
const fs = require("fs");

const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser");

const app = express();

// body-parser
app.use(express.json());

app.listen(3000, () => {
  console.log("npm install");
  console.log("http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Root Router");
});

// 다운로드
app.get("/download/:productId/:fileName", (req, res) => {
  const { productId, fileName } = req.params;
  const filepath = `${__dirname}/uploads/${productId}/${fileName}`; // 파일을 가져올 경로
  // 응답정보
  res.header(
    "Content-type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}`
  );
  if (!fs.existsSync(filepath)) {
    console.log("다운로드 실패");
    res.send("파일이 없습니다.");
  }
  fs.createReadStream(filepath).pipe(res);
  // res.send("다운로드 완료");
});

// 업로드

// 데이터 쿼리
app.post("/api/:alias", async (req, res) => {
  // console.log(req.params.alias);
  // console.log(req.body.param);
  // console.log(req.body.where);

  const result = await query(req.params.alias, req.body.param, req.body.where);
  res.send(result);
});
