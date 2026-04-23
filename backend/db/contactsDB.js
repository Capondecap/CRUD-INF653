// MEMBER 2 — In-memory contact store

const db = {}; // { [username]: Contact[] }

function getContacts(username) {
  // TODO: return db[username] or []
}

function addContact(username, name, phone) {
  // TODO: create contact { id: Date.now(), name, phone }, push to db[username], return it
}

function deleteContact(username, id) {
  // TODO: remove contact by id, return true if removed, false if not found
}

module.exports = { getContacts, addContact, deleteContact };
