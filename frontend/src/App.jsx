// MEMBER 3 — Root component: manages state and calls the API

import { useState, useEffect } from 'react';
import api from './api';
import LoginForm from './components/LoginForm';
import AddContactForm from './components/AddContactForm';
import ContactList from './components/ContactList';

export default function App() {
  const [user, setUser] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  // Task 2a: fetch CSRF token on mount and store in state
  const fetchCsrfToken = async () => {
    try {
      const res = await api.get('/api/csrf-token');
      setCsrfToken(res.data.csrfToken);
    } catch (err) {
      console.error('Could not fetch CSRF token', err);
    }
  };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  useEffect(() => {
    if (user) {
      api.get('/api/contacts').then((res) => setContacts(res.data));
    }
  }, [user]);

  // Auth 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/api/login', loginForm, {
        headers: { 'x-csrf-token': csrfToken },
      });
      setUser(res.data.username);
      await fetchCsrfToken();
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const handleLogout = async () => {
    await api.post('/api/logout', {}, { headers: { 'x-csrf-token': csrfToken } });
    setUser(null);
    setContacts([]);
    await fetchCsrfToken();
  };

  // Contacts

  // Task 2b: include x-csrf-token header when adding a contact
  const handleAdd = async (name, phone) => {
    setError('');
    try {
      const res = await api.post(
        '/api/contacts',
        { name, phone },
        { headers: { 'x-csrf-token': csrfToken } }
      );
      setContacts((prev) => [...prev, res.data]);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add contact');
      return false;
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/contacts/${id}`, {
      headers: { 'x-csrf-token': csrfToken },
    });
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // Render 

  if (!user) {
    return (
      <LoginForm
        loginForm={loginForm}
        onChange={setLoginForm}
        onSubmit={handleLogin}
        error={error}
      />
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Phone Book</h1>
        <span>
          Logged in as <strong>{user}</strong>&nbsp;
          <button onClick={handleLogout} className="btn-sm">Logout</button>
        </span>
      </header>

      <AddContactForm onAdd={handleAdd} error={error} />

      <h2>Contacts</h2>
      <ContactList contacts={contacts} onDelete={handleDelete} />
    </div>
  );
}
