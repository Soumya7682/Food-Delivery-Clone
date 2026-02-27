import '../../styles/theme.css'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

function FoodPartnerRegister() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullname = e.target['business-name'].value;
    const contactName = e.target['contact-name'].value;
    const phoneNumber = e.target.phone.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Validate inputs
    if (!fullname || !contactName || !phoneNumber || !address || !email || !password) {
      console.error('All fields are required');
      return;
    }

    try {
      const response = await axios.post('/api/auth/food-partner/register', {
        fullname,
        contactName,
        phoneNumber,
        address,
        email,
        password
      });
      console.log('Registration successful:', response.data);
      setAuth({ type: 'foodPartner', profile: response.data.foodpartner });
      navigate(`/food-partner/${response.data.foodpartner._id}`);
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-toggle">
          <a href="/user/register" className="auth-toggle-btn">
            User Register
          </a>
          <a href="/food-partner/register" className="auth-toggle-btn active">
            Food Partner Register
          </a>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Partner with Us</h1>
          <p className="auth-subtitle">Register your restaurant or delivery service</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="business-name">
              Business Name
            </label>
            <input
              id="business-name"
              type="text"
              className="form-input"
              placeholder="Enter your business name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-name">
              Contact Name
            </label>
            <input
              id="contact-name"
              type="text"
              className="form-input"
              placeholder="Enter contact person name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className="form-input"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              type="text"
              className="form-input"
              placeholder="Enter your business address"
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
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Create a password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className="form-button">
            Register Business
          </button>
        </form>

        <div className="auth-footer">
          Already registered? <a href="/food-partner/login">Sign in</a>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
