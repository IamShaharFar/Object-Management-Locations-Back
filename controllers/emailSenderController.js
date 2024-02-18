const {sendEmail, sendWhatsApp} = require('../utils/messagingUtility')

exports.sendEmailRoute = async (req, res) => {
    const { toMail, subject, mailBody } = req.body;
  
    try {
      const emailInfo = await sendEmail(toMail, subject, mailBody);
      res.status(200).json({ message: "Email sent successfully", info: emailInfo });
    } catch (error) {
      console.error("Failed to send email:", error);
      res.status(500).json({ message: "Failed to send email", error: error.toString() });
    }
  };
  
  exports.sendWhatsAppRoute = async (req, res) => {
    const { toNumber, messageBody } = req.body;
  
    try {
      const emailInfo = await sendWhatsApp(toNumber, messageBody);
      res.status(200).json({ message: "Message sent successfully", info: emailInfo });
    } catch (error) {
      console.error("Failed to send Message:", error);
      res.status(500).json({ message: "Failed to send Message", error: error.toString() });
    }
  };