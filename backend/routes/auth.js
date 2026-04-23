// MEMBER 1 — Authentication routes + CSRF token endpoint

const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

const DEMO_USER = { username: 'demo', password: 'password123' };

// GET /api/csrf-token
router.get('/csrf-token', (req, res) => {
  // TODO: respond with { csrfToken: req.csrfToken() }
});

// POST /api/login
router.post('/login', (req, res) => {
  // TODO: check credentials against DEMO_USER, set req.session.user, return 401 on failure
});

// POST /api/logout
router.post('/logout', requireAuth, (req, res) => {
  // TODO: destroy session, clear cookie, respond with { message: 'Logged out' }
});

module.exports = router;
