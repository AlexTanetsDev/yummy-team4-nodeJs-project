const getCurrent = async (req, res) => {
  const { _id: id, name, email, avatarURL, subscription, createdAt } = req.user;

  const currentDate = new Date();
  const userCreationDate = new Date(createdAt);
  const timeDiff = currentDate - userCreationDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  let tenthDayOfUsage = false;

  if (daysDiff === 10) {
    tenthDayOfUsage = true;
  }

  res.json({
    id,
    name,
    email,
    avatarURL,
    subscription,
    tenthDayOfUsage,
  });
};

module.exports = getCurrent;
