const url = new URL(
  "https://user:pass@sum.example.com:8080/a/b/c?query=name&num=1#node"
);

const params = url.searchParams;

console.log(params.get("query")); // parameter
console.log(params.get("num"));
