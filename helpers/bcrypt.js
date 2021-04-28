const bcrypt = require('bcryptjs');

const hashPassword = (pass) => {
  const hashed = bcrypt.hashSync(pass, 10);
  return hashed;
};

const compare = (pass, hash) => {
  return bcrypt.compareSync(pass, hash);
};

module.exports = {
  hashPassword,
  compare,
};
