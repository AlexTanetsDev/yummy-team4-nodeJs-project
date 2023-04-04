const User = require("../../models/user");

const getUserStatistics = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  const createdAt = user.createdAt;
  const currentTime = new Date();
  const timeElapsed = convertMS(currentTime.getTime() - createdAt.getTime());

  res.status(200).json({
    time: timeElapsed,
    favorites: user.favorites.length,
    recipes: user.recipes.length,
    shopigList: user.shopingList,
  });
};

module.exports = getUserStatistics;

function convertMS(milliseconds) {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  return days;
}
