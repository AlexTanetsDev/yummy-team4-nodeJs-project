const { User } = require("../../models/user");
const cloudinary = require("cloudinary").v2;

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;
  const user = await User.findById(_id, "name avatarURL -_id");
  if (req.file) {
    const { filename } = req.file;
    user.avatarURL = cloudinary.url(filename, {
      gravity: "faces",
      width: 250,
      height: 250,
      crop: "fill",
    });
  }
  if (name) {
    user.name = name;
  }

  await User.findByIdAndUpdate(_id, user);
  res.json(user);
};

module.exports = updateAvatar;
