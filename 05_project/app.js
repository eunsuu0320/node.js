const express = require("express");
require("dotenv").config({ path: "./mysql/.env" });
const fs = require("fs");
const path = require("path");

const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser");

const app = express();

// 업로드 경로확인
let uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// body-parser
app.use(express.json({ limit: "10mb" }));

app.listen(3000, () => {
  console.log("npm install");
  console.log("http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Root Router");
});

app.get("/fileupload", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
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
app.post("/upload/:filename/:pid", (req, res) => {
  const { filename, pid } = req.params;
  //  const filePath = `${__dirname}/uploads/${filename}`;
  let productDir = path.join(uploadDir, pid);
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir);
  }

  const safeFilename = path.basename(filename); // 경로공격
  const filePath = path.join(uploadDir, pid, safeFilename);

  try {
    let base64Data = req.body.data;
    let data = req.body.data.slice(req.body.data.indexOf(";base64,") + 8); // base64 이후의 글자를 잘라오기위해 + 8을 씀.
    fs.writeFile(filePath, data, "base64", (err) => {
      if (err) {
        res.send("error");
      } else {
        res.send("success");
      }
    });
  } catch (err) {
    res.send("error");
  }
});

// 데이터 쿼리
app.post("/api/:alias", async (req, res) => {
  // console.log(req.params.alias);
  // console.log(req.body.param);
  // console.log(req.body.where);

  const result = await query(req.params.alias, req.body.param, req.body.where);
  res.send(result);
});
