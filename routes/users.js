const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { insertUser, findUserByUsername, updateBio } = require('../db');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  insertUser(username, hashed, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Registration failed' });
    }
    res.status(201).json({ message: 'User registered' });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  findUserByUsername(username, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.json({ token });
  });
});

router.post('/profile/bio', verifyToken, (req, res) => {
  const { username, bio } = req.body;
  updateBio(username, bio, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Update failed' });
    }
    res.send(`<div>Bio updated: ${bio}</div>`);
  });
});

router.get('/profile/:username', (req, res) => {
  findUserByUsername(req.params.username, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.send(`<h1>${user.username}</h1><p>${user.bio}</p>`);
  });
});

module.exports = router;