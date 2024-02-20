//const cron = require("node-cron");
const accountSid = 'ACfc99f3968bcae8dff76c5c452acc4dbc';
const authToken = 'a1f8c818ad4ff5991debda77f75b19e5';
const client = require('twilio')(accountSid, authToken);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require("dotenv").config();



function sendEmail(toMail, subject, mailBody) {
  console.log("in mail");
  const msg = {
    to: toMail, 
    from: 'kikbatovski123456@gmail.com',
    subject: subject,
    text: mailBody,
  };
  
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
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