//const cron = require("node-cron");
const nodemailer = require("nodemailer");
const accountSid = 'ACfc99f3968bcae8dff76c5c452acc4dbc';
const authToken = 'a1f8c818ad4ff5991debda77f75b19e5';
const client = require('twilio')(accountSid, authToken);
require("dotenv").config();

// Nodemailer setup for Mailtrap
var transport = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: "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",
  },
});

function sendEmail(toMail, subject, mailBody) {
  const mailOptions = {
    from: "kikbatovski123456@gmail.com",
    to: toMail,
    subject: subject,
    text: mailBody,
  };
  console.log("sending email to", toMail);

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (error, info) => {
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
  client.messages
    .create({
      body: `${messageBody}`,
      from: `whatsapp:+14155238886`,
      to: `whatsapp:${toNumber}`
    })
    .catch(error => console.error("Error sending message:", error));
  // console.log("toNumber", toNumber);
  // console.log("messageBody", messageBody)

}

module.exports = { sendEmail, sendWhatsApp };