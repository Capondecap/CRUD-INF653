// MEMBER 1 — Auth guard middleware used by protected routes

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
// MEMBER 1 — Auth guard middleware

function requireAuth(req, res, next) {
  // TODO: check req.session.user, return 401 if missing
}

module.exports = requireAuth;
