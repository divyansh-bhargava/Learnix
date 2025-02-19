const nodemailer = require("nodemailer")
require("dotenv").config()

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
});

async function mailSender(email, subject , body ) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'divyansh bhargava from edtech', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: body, // html body
    });
  
    console.log("Message sent: %s", info);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

module.exports = mailSender