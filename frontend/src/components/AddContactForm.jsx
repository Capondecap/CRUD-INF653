// MEMBER 3 — Add Contact form component

import { useState } from 'react';

export default function AddContactForm({ onAdd, error }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await onAdd(name, phone);
    if (ok) {
      setName('');
      setPhone('');
    }
  };

  return (
    <>
      <h2>Add Contact</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
