// MEMBER 3 — Login form component

export default function LoginForm({ loginForm, onChange, onSubmit, error }) {
  return (
    <div className="container">
      <h1>Phone Book — Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit} className="form">
        <input
          placeholder="Username"
          value={loginForm.username}
          onChange={(e) => onChange({ ...loginForm, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={(e) => onChange({ ...loginForm, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="hint">
        Demo: username <strong>demo</strong> / password <strong>password123</strong>
      </p>
    </div>
  );
}
