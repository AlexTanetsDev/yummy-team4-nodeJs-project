const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

async function sendEmail(email) {
  try {
    const mail = {
      // to: email,
      to: "kovalchuk.anastasia0612@gmail.com",
      from: "alexTanetsDev@gmail.com",
      subject: "subscribe to news ",
      html: `<a target="_blank" href="${BASE_URL}/api/">Click to subscribe "So Yummy"</a>`,
    };
    await sgMail.send(mail);
  } catch (error) {
    console.error(error);
  }
}

module.exports = sendEmail;
