const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

async function sendEmail(email) {
  try {
    const mail = { ...email, from: "alexTanetsDev@gmail.com" };
    console.log(mail);
    await sgMail.send(mail);
  } catch (error) {
    console.error(error);
  }
}

module.exports = sendEmail;
