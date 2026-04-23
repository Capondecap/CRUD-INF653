// MEMBER 2 — In-memory contact store
// Replace this module with a real database (e.g. MongoDB, SQLite) without
// touching any route or middleware files.

const db = {}; // { [username]: Contact[] }

function getContacts(username) {
  return db[username] || [];
}

function addContact(username, name, phone) {
  if (!db[username]) db[username] = [];
  const contact = { id: Date.now(), name, phone };
  db[username].push(contact);
  return contact;
}

function deleteContact(username, id) {
  if (!db[username]) return false;
  const before = db[username].length;
  db[username] = db[username].filter((c) => c.id !== id);
  return db[username].length < before; // true if something was removed
}

module.exports = { getContacts, addContact, deleteContact };
