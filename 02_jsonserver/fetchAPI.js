async function json_func() {
  try {
    let promise = await fetch("http://localhost:3000/posts/3", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "3", title: "3번 수정", author: "admin" }),
    });
    let resolve = await promise.json();
    console.log("결과 => ", resolve);

    promise = await fetch("http://localhost:3000/posts");
    resolve = await promise.json();
    console.log("조회 => ", resolve);
  } catch (err) {
    console.log(err);
  }
}
json_func();
