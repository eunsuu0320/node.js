module.exports = {
  customerList: "select * from customers",
  customerInsert: "insert into customers set ?", // mysql에서만 쓸 수 있는 구문
  customerUpdate: "update customers set ? where id = ?",
  customerDelete: "delete from customers where id = ?",
  customerSql: "?",
};
