import '../../styles/theme.css'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function UserRegister() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullname = e.target.fullname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        // Validate inputs
        if (!fullname || !email || !password) {
            console.error('All fields are required');
            return;
        }

        try {
            const response = await axios.post('/api/auth/user/register', { 
                fullname, 
                email, 
                password 
            });
            console.log('Success:', response.data);
            setAuth({ type: 'user', profile: response.data.user });
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            // Display error to user if needed
            alert(error.response?.data?.message || 'Registration failed. Please try again.');
        }
    }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-toggle">
          <a href="/user/register" className="auth-toggle-btn active">
            User Register
          </a>
          <a href="/food-partner/register" className="auth-toggle-btn">
            Food Partner Register
          </a>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Sign up to start ordering food</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="fullname">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>

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

          <button type="submit" className="form-button">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <a href="/user/login">Sign in</a>
        </div>
      </div>
    </div>
  )
}

export default UserRegister
