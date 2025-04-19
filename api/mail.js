const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or 'smtp.mailtrap.io', 'mailgun', etc.
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Function to send email
function sendMail(name, email, subject, text) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "asaadalhalabi@gmail.com", // your personal or company email
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${text}`,
  };

  return transporter.sendMail(mailOptions);
}

// API route handler (e.g., /api/send)
module.exports = async (req, res) => {
  const { InputName, InputSubject, InputEmail, InputMessage } = req.body;

  if (!InputSubject || InputSubject.trim() === "") {
    return res.status(400).json({ message: "Subject is required." });
  }

  try {
    await sendMail(InputName, InputEmail, InputSubject, InputMessage);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Internal Error", error });
  }
};
