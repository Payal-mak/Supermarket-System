import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { required, minLength, phone, email, validateForm } from '../utils/validators';
import logo from '../assets/radhika-logo.png';
import './AuthPage.css';

export default function AuthPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Login form
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});

  // Register form
  const [regForm, setRegForm] = useState({
    first_name: '', last_name: '', username: '', phone: '', email: '', password: '', confirm_password: '',
  });
  const [regErrors, setRegErrors] = useState({});

  const loginRules = {
    username: [(v) => required(v, 'Username')],
    password: [(v) => required(v, 'Password')],
  };

  const regRules = {
    first_name: [(v) => required(v, 'First name'), (v) => minLength(v, 2, 'First name')],
    last_name:  [(v) => required(v, 'Last name')],
    username:   [(v) => required(v, 'Username'), (v) => minLength(v, 3, 'Username')],
    phone:      [phone],
    email:      [email],
    password:   [(v) => required(v, 'Password'), (v) => minLength(v, 6, 'Password')],
    confirm_password: [(v) => required(v, 'Confirm password')],
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const { errors, isValid } = validateForm(loginForm, loginRules);
    setLoginErrors(errors);
    if (!isValid) return;

    setLoading(true);
    try {
      await login(loginForm.username, loginForm.password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const { errors, isValid } = validateForm(regForm, regRules);

    // Password match check
    if (regForm.password && regForm.confirm_password && regForm.password !== regForm.confirm_password) {
      errors.confirm_password = 'Passwords do not match';
    }

    setRegErrors(errors);
    if (!isValid || errors.confirm_password) return;

    setLoading(true);
    try {
      await register({
        first_name: regForm.first_name,
        last_name: regForm.last_name,
        username: regForm.username,
        phone: regForm.phone || undefined,
        email: regForm.email || undefined,
        password: regForm.password,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    setLoginForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setLoginErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setError('');
  };

  const handleRegChange = (e) => {
    setRegForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setRegErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Branding */}
        <div className="auth-brand">
          <img src={logo} alt="Radhika Mall" className="auth-logo" />
          <h1>Radhika <span>Mall</span></h1>
          <p>Radhika Raj Enterprise — Gondal</p>
        </div>

        {/* Tab Toggle */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError(''); }}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => { setMode('register'); setError(''); }}
          >
            Register
          </button>
        </div>

        {/* Global error */}
        {error && <div className="auth-error">⚠ {error}</div>}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form className="auth-form" onSubmit={handleLogin} noValidate>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                className={`form-input ${loginErrors.username ? 'error' : ''}`}
                name="username" value={loginForm.username}
                onChange={handleLoginChange}
                placeholder="Enter your username"
                autoComplete="username"
              />
              {loginErrors.username && <span className="form-error">{loginErrors.username}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className={`form-input ${loginErrors.password ? 'error' : ''}`}
                name="password" type="password" value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {loginErrors.password && <span className="form-error">{loginErrors.password}</span>}
            </div>

            <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={loading}>
              {loading ? '⏳ Signing in…' : '🔐 Sign In'}
            </button>

            <p className="auth-switch">
              Don't have an account? <button type="button" onClick={() => setMode('register')}>Register here</button>
            </p>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form className="auth-form" onSubmit={handleRegister} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input className={`form-input ${regErrors.first_name ? 'error' : ''}`} name="first_name" value={regForm.first_name} onChange={handleRegChange} placeholder="Tanvi" />
                {regErrors.first_name && <span className="form-error">{regErrors.first_name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input className={`form-input ${regErrors.last_name ? 'error' : ''}`} name="last_name" value={regForm.last_name} onChange={handleRegChange} placeholder="Kakadiya" />
                {regErrors.last_name && <span className="form-error">{regErrors.last_name}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Username *</label>
              <input className={`form-input ${regErrors.username ? 'error' : ''}`} name="username" value={regForm.username} onChange={handleRegChange} placeholder="Choose a username (min 3 chars)" autoComplete="username" />
              {regErrors.username && <span className="form-error">{regErrors.username}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className={`form-input ${regErrors.phone ? 'error' : ''}`} name="phone" value={regForm.phone} onChange={handleRegChange} placeholder="9876543210" maxLength={10} />
                {regErrors.phone && <span className="form-error">{regErrors.phone}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className={`form-input ${regErrors.email ? 'error' : ''}`} name="email" type="email" value={regForm.email} onChange={handleRegChange} placeholder="you@example.com" />
                {regErrors.email && <span className="form-error">{regErrors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Password *</label>
                <input className={`form-input ${regErrors.password ? 'error' : ''}`} name="password" type="password" value={regForm.password} onChange={handleRegChange} placeholder="Min 6 characters" autoComplete="new-password" />
                {regErrors.password && <span className="form-error">{regErrors.password}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input className={`form-input ${regErrors.confirm_password ? 'error' : ''}`} name="confirm_password" type="password" value={regForm.confirm_password} onChange={handleRegChange} placeholder="Re-enter password" autoComplete="new-password" />
                {regErrors.confirm_password && <span className="form-error">{regErrors.confirm_password}</span>}
              </div>
            </div>

            <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={loading}>
              {loading ? '⏳ Creating account…' : '✅ Create Account'}
            </button>

            <p className="auth-switch">
              Already have an account? <button type="button" onClick={() => setMode('login')}>Sign in</button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
