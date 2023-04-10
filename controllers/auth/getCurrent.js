const getCurrent = async (req, res) => {
  const { _id: id, name, email, avatarURL, subscription } = req.user;
  res.json({
    id,
    name,
    email,
    avatarURL,
    subscription,
  });
};

module.exports = getCurrent;
