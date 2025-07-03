const express = require("express");
const router = express.Router();

// 라우팅 정보 생성.
router.get("/products", (req, res) => {
  res.send("/product 루트 디렉토리");
});

router.post("/insert", (req, res) => {
  res.send("/product POST 요청");
});

router.put("/update", (req, res) => {
  res.send("/product PUT 요청");
});

router.delete("/delete", (req, res) => {
  res.send("/product DELETE 요청");
});

module.exports = router;
