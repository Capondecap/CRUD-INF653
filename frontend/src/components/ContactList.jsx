// MEMBER 3 — Contact list component

export default function ContactList({ contacts, onDelete }) {
  if (contacts.length === 0) return <p>No contacts yet.</p>;

  return (
    <ul className="contact-list">
      {contacts.map((c) => (
        <li key={c.id}>
          <span>{c.name} — {c.phone}</span>
          <button onClick={() => onDelete(c.id)} className="btn-sm btn-danger">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
