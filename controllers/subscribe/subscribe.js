const { User } = require("../../models/user");

const { controllersWrapper, sendEmail } = require("../../helpers");

// const { BASE_URL } = process.env;

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription, email } = req.body;

  await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );

  res.json({
    subscription,
  });

  try {
    const subscribeEmail = { to: email };
    if (subscription === "subscribe") {
      subscribeEmail.subject = "You are subscribed to news";
      subscribeEmail.html = `Congratulations, now you will be up to date with all the news "So yummy"!`;
    } else {
      subscribeEmail.subject = "You unsubscribed from the news";
      subscribeEmail.html = `We are sorry that you unsubscribed from the news "So yummy`;
    }

    await sendEmail(subscribeEmail);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  updateSubscription: controllersWrapper(updateSubscription),
};
