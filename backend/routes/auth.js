// MEMBER 1 — Authentication routes + CSRF token endpoint

const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Hard-coded demo user (lab focus is CSRF/session, not a real user store)
const DEMO_USER = { username: 'demo', password: 'password123' };

// GET /api/csrf-token
// Returns a fresh CSRF token for the frontend to store and re-send on mutations
router.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
const DEMO_USER = { username: 'demo', password: 'password123' };

// GET /api/csrf-token
router.get('/csrf-token', (req, res) => {
  // TODO: respond with { csrfToken: req.csrfToken() }
});

// POST /api/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    req.session.user = { username };
    return res.json({ message: 'Logged in', username });
  }
  res.status(401).json({ error: 'Invalid credentials' });
  // TODO: check credentials against DEMO_USER, set req.session.user, return 401 on failure
});

// POST /api/logout
router.post('/logout', requireAuth, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
  // TODO: destroy session, clear cookie, respond with { message: 'Logged out' }
});

module.exports = router;
