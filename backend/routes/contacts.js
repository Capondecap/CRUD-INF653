// MEMBER 2 — Contacts CRUD routes

const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { getContacts, addContact, deleteContact } = require('../db/contactsDB');

const router = express.Router();

// GET /api/contacts
router.get('/', requireAuth, (req, res) => {
  // TODO: get username from req.session.user, respond with getContacts(username)
});

// POST /api/contacts
router.post('/', requireAuth, (req, res) => {
  // TODO: validate name & phone (400 if missing), call addContact, respond 201
});

// DELETE /api/contacts/:id
router.delete('/:id', requireAuth, (req, res) => {
  // TODO: call deleteContact, respond 404 if not found, else { message: 'Deleted' }
});

module.exports = router;
