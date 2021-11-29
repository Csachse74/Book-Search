const jwt = require('jsonwebtoken');

const secret = 'mysachsesecret';
const expiration = '3h';

module.exports = {
  authMiddleware: function ({ request }) {
    let token = request.body.token || request.query.token || request.headers.authorization;

    if (request.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return request;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      request.user = data;
    } catch {
      console.log('No token');
    }

    return request;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
