fetch("http://localhost:3000/posts", {
  method: "post",
  // headers: { "Content-Type": "application/json" },
  // body: JSON.stringify({ id: 9, title: "fetch연습", author: "admin" }),
})
  .then((resolve) => resolve.text())
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));
