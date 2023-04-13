const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

async function sendEmail(email) {
  try {
    const mail = { ...email, from: EMAIL_FROM };
    await sgMail.send(mail);
  } catch (error) {
    console.error(error);
  }
}

module.exports = sendEmail;
