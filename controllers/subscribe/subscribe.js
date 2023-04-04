const { User } = require("../../models/user");

const { controllersWrapper, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription, email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );

  res.json({
    data: updatedUser,
  });
  if (subscription === "subscribe") {
    try {
      const subscribeEmail = {
        to: email,
        subject: "subscribe to news ",
        html: `<a target="_blank" href="${BASE_URL}/api/">Click to subscribe "So Yummy"</a>`,
      };

      await sendEmail(subscribeEmail);
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = {
  updateSubscription: controllersWrapper(updateSubscription),
};
