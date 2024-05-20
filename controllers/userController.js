const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const prisma = new PrismaClient();

const register = async (req, res) => {
  const { email, password, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        role: role
      },
    });
    res.status(201).send({ message: 'User created' });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.send({ token });
};

module.exports = { register, login };

