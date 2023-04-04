const { User } = require("../../models/user");

const { controllersWrapper, sendEmail } = require("../../helpers");

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
    sendEmail(email);
  }
};

module.exports = {
  updateSubscription: controllersWrapper(updateSubscription),
};
