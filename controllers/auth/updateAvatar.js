const { User } = require("../../models/user");
const cloudinary = require("cloudinary").v2;

const updateAvatar = async (req, res) => {
  const { _id, name } = req.body;
  const { filename } = req.file;

  const newAvatarUrl = cloudinary.url(filename, {
    gravity: "faces",
    width: 250,
    height: 250,
    crop: "fill",
  });

  await User.findByIdAndUpdate(_id, { avatarURL: newAvatarUrl, name });
  res.json({
    name,
    newAvatarUrl,
  });
};

module.exports = updateAvatar;
