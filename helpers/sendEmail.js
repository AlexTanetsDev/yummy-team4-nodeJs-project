const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, BASE_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "alexTanetsDev@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
