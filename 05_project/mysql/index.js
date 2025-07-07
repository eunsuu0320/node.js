const mysql = require("mysql2");
const sql = require("./product");

// DB 정보 불러오기
const pool = mysql.createPool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  connectionLimit: process.env.LIMIT,
});

// 쿼리가 추가하고 싶은 구문이 있다고 하면 아래 코드에 추가해주면 된다. query() 안에랑, pool.query(sql ~~~) 여기에 알맞게 넣어주면 됨.
async function query(alias, values = [], where = "") {
  return new Promise((resolve, reject) => {
    console.log(sql[alias].query + where);
    pool.query(sql[alias].query + where, values, (err, result) => {
      if (err) {
        console.log("처리 중 에러", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = { query };
