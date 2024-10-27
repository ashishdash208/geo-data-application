const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');  // Importing the Sequelize models

// Register User
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await db.User.findOne({ where: { username } });
    if (existingUser) return res.status(409).json({ statusCode: 409, error: 'User already exists' });

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create new user
    const user = await db.User.create({ username, password: hashedPassword });

    // Generate JWT token after successful registration
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ statusCode: 200, message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Login User
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user, if exists
    const user = await db.User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Check password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ statusCode: 200, message: 'Logged in successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const validateToken = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if expired or invalid
    res.status(200).json({ valid: true });
  });
};

module.exports = { register, login, validateToken }