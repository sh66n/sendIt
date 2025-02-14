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

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    return { message: "Your email has been sent!", status: 200 };
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong!", status: 400 };
  }
};

module.exports = {
  transporter,
  sendMail,
};
