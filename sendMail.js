const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const mailOptions = {
  from: {
    name: "SendIt",
    address: process.env.USER_MAIL,
  },
  to: ["shaanedroos85@gmail.com"], // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
};

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    return { message: "Your email has been sent!", status: 200 };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  transporter,
  sendMail,
};
