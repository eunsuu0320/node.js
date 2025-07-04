const nodemailer = require("nodemailer");
require("dotenv");

const config = {
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "esoo8188@daum.net",
    pass: "ispmkiknzqcxbzre",
  },
};

const sendEmail = async (data) => {
  return new Promise(async (resolve, reject) => {
    let tp = nodemailer.createTransport(config);
    try {
      let result = await tp.sendMail(data);
      console.log("메일 성공", result);
      resolve(result);
    } catch (err) {
      console.log("메일 실패", err);
      reject(err);
    }
  });
};

// tp.sendMail({
//   from: "esoo8188@daum.net",
//   to: "esooo8188@gmail.com",
//   subject: "dddddddddd",
//   text: "dddddddddddddddddddddd",
// });

module.exports = {
  sendEmail,
};
