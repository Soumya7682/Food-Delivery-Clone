import '../../styles/theme.css'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function UserLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Validate inputs
    if (!email || !password) {
      console.error('Email and password are required');
      return;
    }

    try {
      const response = await axios.post('/api/auth/user/login', {
        email,
        password
      });
      console.log('Login successful:', response.data);
      setAuth({ type: 'user', profile: response.data.user });
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-toggle">
          <a href="/user/login" className="auth-toggle-btn active">
            User Login
          </a>
          <a href="/food-partner/login" className="auth-toggle-btn">
            Food Partner Login
          </a>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <div className="form-checkbox">
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button type="submit" className="form-button">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <a href="/user/register">Create one</a>
          </p>
          <p style={{ marginTop: '8px' }}>
            <a href="#forgot-password" style={{ fontSize: '13px' }}>
              Forgot password?
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
