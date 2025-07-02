const crypto = require("crypto");

let pw = crypto.createHash("sha512").update("pw1234").digest("base64");
// console.log(pw);

// salting 암호화
const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      // err or buf 둘 중 하나만 들어옴
      if (err) {
        reject(err);
      }
      resolve(buf);
    });
  });
};
createSalt(); //
// .then((result) => console.log(result.toString("base64")));

// salt 방식으로 암호화
const createCryptoPassword = (plainPassword, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 10000, 64, "sha512", (err, key) => {
      if (err) {
        reject(err);
      }
      resolve({ salt: salt, password: key.toString("base64") });
    });
  });
};

// 패스워드 생성
async function main() {
  const salt = await createSalt();
  // console.log(salt);
  const pw = await createCryptoPassword("1111", salt);
  console.log(pw);
}
main();
