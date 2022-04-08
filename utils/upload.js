const { v4: uuidv4 } = require("uuid");

const upload = (file, folder) => {
  const uniq = uuidv4();
  const { name, size, mimetype } = file;

  file.mv(`./uploads/${folder}/${uniq}` + name);

  return {
    name,
    size,
    mimetype,
    folder: `/${folder}/${uniq}` + name,
    filename: `${uniq}${name}`,
  };
};

module.exports = { upload };
