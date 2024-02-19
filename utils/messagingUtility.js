//const cron = require("node-cron");
const nodemailer = require("nodemailer");
const accountSid = 'ACfc99f3968bcae8dff76c5c452acc4dbc';
const authToken = 'a1f8c818ad4ff5991debda77f75b19e5';
const client = require('twilio')(accountSid, authToken);
require("dotenv").config();

// Nodemailer setup for Mailtrap
let transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465, // Secure SMTP port
  secure: true, 
  auth: {
      user: 'catchitmamram@yahoo.com', 
      pass: 'imu$p3#4B-M!C.q' 
  }
});

function sendEmail(toMail, subject, mailBody) {
  const mailOptions = {
    from: "catchitmamram@yahoo.com",
    to: toMail,
    subject: subject,
    text: mailBody,
  };
  console.log("sending email to", toMail);

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending test email:", error);
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

function sendWhatsApp(toNumber, messageBody) {
  console.log("in whatsapp")
  console.log("toNumber", toNumber)
  client.messages
    .create({
      body: `${messageBody}`,
      from: `whatsapp:+14155238886`,
      to: `whatsapp:${toNumber}`
    })
    .catch(error => console.error("Error sending message:", error));
    console.log("finished whatsapp")
  // console.log("toNumber", toNumber);
  // console.log("messageBody", messageBody)

}

module.exports = { sendEmail, sendWhatsApp };