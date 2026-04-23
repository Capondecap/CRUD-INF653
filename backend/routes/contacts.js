// MEMBER 2 — Contacts CRUD routes

const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { getContacts, addContact, deleteContact } = require('../db/contactsDB');

const router = express.Router();

// All contacts routes require a valid session (requireAuth)
// POST also requires a valid CSRF token (enforced globally in server.js)

// GET /api/contacts
router.get('/', requireAuth, (req, res) => {
  const { username } = req.session.user;
  res.json(getContacts(username));
});

// POST /api/contacts  — protected by session + CSRF
router.post('/', requireAuth, (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'name and phone are required' });
  }
  const { username } = req.session.user;
  const contact = addContact(username, name, phone);
  res.status(201).json(contact);
});

// DELETE /api/contacts/:id — protected by session + CSRF
router.delete('/:id', requireAuth, (req, res) => {
  const { username } = req.session.user;
  const id = Number(req.params.id);
  const removed = deleteContact(username, id);
  if (!removed) return res.status(404).json({ error: 'Contact not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
