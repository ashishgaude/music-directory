const config = require("config.json");
const jwt = require("jsonwebtoken");
const db = require("_helpers/db");

const { QueryTypes } = require("sequelize");

module.exports = {
  authenticate,
};

async function authenticate({ username, password, ipAddress }) {
  // const account = await db.Account.findOne({
  //   where: { username, password },
  // });
  console.log("userpass", username, password);
  const account = await db.sequelize.query(
    `SELECT * FROM user where username= "${username}" and password = "${password}"`,
    {
      type: QueryTypes.SELECT,
    }
  );

  console.log("result:::::", account);

  if (account.length === 0) {
    throw {
      name: "UnauthorizedError",
      message: "username or password is incorrect",
    };
  }

  // authentication successful so generate jwt token
  const jwtToken = generateJwtToken(account[0]);

  // return basic details and tokens
  return {
    ...basicDetails(account),
    jwtToken,
  };
}

// helper functions

function generateJwtToken(account) {
  // create a jwt token containing the account id that expires in 15 minutes
  return jwt.sign({ sub: account.id, id: account.id }, config.secret, {
    expiresIn: "15m",
  });
}

function basicDetails(account) {
  const { id, username, fullname } = account;
  return {
    id,
    username,
    fullname,
  };
}
