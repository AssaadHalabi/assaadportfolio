const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  process.env.SENDGRID_API_KEY
);

function sendMail(name, email, subject, text) {

  const msg = {
    from: "zoomala.service@gmail.com",
    to: "asaadalhalabi@gmail.com",
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${text}`,
  };

  return sgMail.send(msg);

  // Exporting the sendmail
}
module.exports = (req, res) => {
  const { InputName, InputSubject, InputEmail, InputMessage } = req.body;
  // Check if the subject is valid
  if (!InputSubject || InputSubject.trim() === "") {
    return res.status(400).json({ message: "Subject is required." });
  }
  console.log("Data: ", req.body);
  sendMail(InputName, InputEmail, InputSubject, InputMessage)
    .then(() => {
      res.status(200).json({ message: "Email sent!!!" });
    })
    .catch((error) => {
      console.error(error.response.body);
      res.status(500).json({ message: "Internal Error" });
    });
};
