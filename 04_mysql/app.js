const mysql = require("mysql2");
const custSql = require("./sql/customerSql");

// DB 정보 불러오기
const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "dev01",
  password: "dev01",
  database: "dev",
  connectionLimit: 10,
});
let data = ["name01", "test@email.com", "010-1111-1111"];
data = [
  {
    name: "username",
    email: "user@eamil.com",
    phone: "010-2222-2222",
    address: "",
  },
  1,
];
// console.log(custSql["customerList"]);
function query(alias, values) {
  pool.query(custSql[alias], values, (err, result) => {
    if (err) {
      console.log("처리 중 에러", err);
    } else {
      console.log(result);
    }
  });
}
query("customerList");
