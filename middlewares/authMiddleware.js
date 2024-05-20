const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const authMiddleware = (roles) => {
  return async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user || !roles.includes(user.role)) {
        return res.status(403).send({ error: 'Access denied' });
      }
      req.user = user;
      next();
    } catch (err) {
      res.status(401).send({ error: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware;
