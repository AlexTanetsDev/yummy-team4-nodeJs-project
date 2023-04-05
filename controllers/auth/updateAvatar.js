const { User } = require("../../models/user");
const cloudinary = require("cloudinary").v2;

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;
  const fieldsReply = { avatarUrl: null, name: null };
  const fieldsUser = {};
  if (req.file) {
    const { filename } = req.file;
    fieldsReply.avatarUrl = fieldsUser.avatarUrl = cloudinary.url(filename, {
      gravity: "faces",
      width: 250,
      height: 250,
      crop: "fill",
    });
  }
  if (name) {
    fieldsReply.name = fieldsUser.name = name;
  }

  await User.findByIdAndUpdate(_id, fieldsUser);
  res.json(fieldsReply);
};

module.exports = updateAvatar;
