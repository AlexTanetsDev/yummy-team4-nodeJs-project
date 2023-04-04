const { User } = require("../../models/user");
const cloudinary = require("cloudinary").v2;

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;
  const { filename } = req.file;

  const fields = {
    avatarUrl: cloudinary.url(filename, {
      gravity: "faces",
      width: 250,
      height: 250,
      crop: "fill",
    }),
  };

  if (name) {
    fields.name = name;
  }

  await User.findByIdAndUpdate(_id, fields);
  res.json(fields);
};

module.exports = updateAvatar;
