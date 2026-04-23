import axios from 'axios';

// Bonus: credentials: 'include' equivalent in Axios — withCredentials ensures
// the session cookie is sent on every request (cross-origin).
const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true, // ← Task 2 Bonus
});

export default api;
