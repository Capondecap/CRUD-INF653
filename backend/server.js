// MEMBER 1 — App entry point
// TODO: Register middleware and mount routes

const express = require('express');
// TODO: import session, csrf, cors, cookieParser

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');

const app = express();
const PORT = 3001;

// TODO: app.use(express.json())
// TODO: app.use(cookieParser())
// TODO: app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
// TODO: app.use(session({ ... }))
// TODO: app.use(csrf({ cookie: true }))

// Routes
app.use('/api', authRoutes);
app.use('/api/contacts', contactRoutes);

// TODO: CSRF error handler middleware

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
