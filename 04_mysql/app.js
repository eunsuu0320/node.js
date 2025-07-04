const express = require("express");
const bodyPerser = require("body-parser");
const path = require("path");
const multer = require("multer");
const xlsx = require("xlsx");

require("dotenv").config({ path: "./sql/.env" });
const nodemailer = require("./nodemailer");

const mysql = require("./sql/index");

// 파일업로드. multer  저장경로와 파일명 지정.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    let fn = Buffer.from(file.originalname, "latin1").toString("utf-8");
    cb(null, Date.now() + "_" + fn);
  },
});
// Multer 인스턴스 생성.
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const app = express();
app.use(bodyPerser.json());

app.get("/", (req, res) => {
  res.send("Root 경로");
});

// 이메일 발송 화면
app.get("/email", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 이메일 전송 post
app.post("/email", async (req, res) => {
  try {
    let result = await nodemailer.sendEmail(req.body.param);
    console.log(result);
    res.json({ retCode: "Success", retVal: result });
  } catch (err) {
    res.json({ restCode: "Failure" });
  }
});

// 파일 업로드 엑셀
app.get("/excel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "excel.html"));
});

// 첨부처리
app.post("/excel", upload.single("myFile"), (req, res) => {
  console.log(req.file); // 업로드 된 파일의 정보
  console.log(req.body); // 요청 몸체의 정보.
  const workbook = xlsx.readFile(`./uploads/${req.file.filename}`);
  const firstSheetName = workbook.SheetNames[0]; // 첫번째 시트.
  // 시트명으로 첫번째 시트 가져오기
  const firstSheet = workbook.Sheets[firstSheetName];
  // 첫번째 시트의 데이터를 json으로 생성
  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);
  console.log(firstSheetJson);
  // 반복문 활용. insert.
  const fsj = firstSheetJson // [{a}, {c}, {k}, {b}]
    .sort((a, b) => {
      return a.name < b.name; // 오름차순(앞에 있는 값보다 뒤에 있는 값이 더 큼)
    });
  fsj.forEach(async (customer) => {
    let result = await mysql.query("customerInsert", customer);
  });
  if (!req.file) {
    res.send("이미지 파일이 아닌 게 업로드 됨");
  } else {
    res.send("업로드 완료");
  }
});

// 반대로 테이블에서 엑셀 파일로 저장하기
app.get("/downloadExcel", async (req, res) => {
  try {
    const customerList = await mysql.query("customerList");
    const worksheet = xlsx.utils.json_to_sheet(customerList);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "CustomerData");

    const customerBuffer = xlsx.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // 헤더 설정 후 응답
    res.setHeader("Content-Disposition", "attachment; filename=customers.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(customerBuffer);
  } catch (err) {
    console.log("에러 발생 => " + err);
  }
});

// 조회
app.get("/customers", async (req, res) => {
  try {
    let result = await mysql.query("customerList");
    res.send(result);
  } catch (err) {
    res.send("에러 발생 => " + err);
  }
});

// 추가
app.post("/customer", async (req, res) => {
  try {
    console.log(req.body.param);
    let data = req.body.param;
    let result = await mysql.query("customerInsert", data);
    res.send(result);
  } catch (err) {
    res.send("에러 발생 => " + err);
  }
});

// 수정
app.put("/customer", async (req, res) => {
  try {
    let data = req.body.param;
    let result = await mysql.query("customerUpdate", data);
    res.send(result);
  } catch (err) {
    res.send("에러 발생 => " + err);
  }
});

// 삭제
//https://localhost:3000/customer/8
app.delete("/customer/:id/:name", async (req, res) => {
  try {
    let { id } = req.params;
    let result = await mysql.query("customerDelete", id);
    res.send(result);
  } catch (err) {
    res.send("에러 발생 => " + err);
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000 running ...");
});
