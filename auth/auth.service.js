const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');

async function login(data) {
  if (!data.email || !data.password) {
    throw new Error("Missing email or password");
  }
  const existedUser = {
    email:'123@gmail.com',
    password:'pass',
    password2:'$2b$08$HeKrPVYmKjYBr9um1di9XOi5fhBp3/1OmVILs8IydHVCsyqJmatL.'
  }
  if (!existedUser) {
    throw new Error("Cannot find user with this email!");
  }
  // Compare password
  const result = await bcrypt.compare(data.password, existedUser.password2);
  if (result) {
    // Gen token
    const tokenData = {
      email: existedUser.email,
      password: existedUser.password,
    };
    const token = await jwt.sign(tokenData, config.secretKey, {
      expiresIn: '2h',
    });
    return token;
  } else {
    throw new Error("Wrong password!");
  }

}

async function authentication (req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send("Unauthenticated!");
    }
    const data = await jwt.verify(token, config.secretKey);
    if (data) {
      if (data.exp <= Date.now() / 1000) {
        res.status(401).send("Token expired!");
      }
    }
    if (!data) {
      res.status(401).send("Unauthenticated!");
    }

    req.user = data;
    next();
  } catch (err) {
    res.status(401).send("Unauthenticated!");
  }
}


module.exports = {
  login,
  authentication,
}