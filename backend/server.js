// MEMBER 1 — App entry point
// Registers middleware and mounts routes. Do not add business logic here.

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');

const app = express();
const PORT = 3001;

// ── Core middleware ────────────────────────────────────────────────────────────

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Session (Task 1a)
app.use(
  session({
    secret: 'phonebook-super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 },
  })
);

// CSRF protection — must come after cookieParser and session (Task 1b)
app.use(csrf({ cookie: true }));

// ── Routes ─────────────────────────────────────────────────────────────────────

app.use('/api', authRoutes);           // Member 1
app.use('/api/contacts', contactRoutes); // Member 2

// ── Error handling ─────────────────────────────────────────────────────────────

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Invalid or missing CSRF token' });
  }
  next(err);
});

// ── Start ──────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log('Demo credentials → username: demo  password: password123');
});
