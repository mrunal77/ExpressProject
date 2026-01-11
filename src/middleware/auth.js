const jwt = require('jsonwebtoken');
const prisma = require('../db');

const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'authorization required' });

  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'authorization required' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return res.status(401).json({ error: 'invalid token' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
};

module.exports = auth;
