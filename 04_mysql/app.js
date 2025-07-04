const express = require("express");
const bodyPerser = require("body-parser");
require("dotenv").config({ path: "./sql/.env" });

console.log(process.env.USER);

const mysql = require("./sql/index");

const app = express();
app.use(bodyPerser.json());

app.get("/", (req, res) => {
  res.send("Root 경로");
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
