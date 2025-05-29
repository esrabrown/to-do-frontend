import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/users/authentication/login',
        formData,
        {
          withCredentials: true, // important if using Spring session cookies
        }
      );

      if (response.status === 200) {
        onLogin();         // Set authentication context/state
        navigate('/');     // Go to homepage or dashboard
      } else {
        setErrors({ general: "Login failed. Please try again." });
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors({ general: "Invalid email or password." });
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>

        {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}

        <button type="submit">Login</button>
      </form>

      <button onClick={() => navigate('/register')} style={{ marginTop: 10 }}>
        Register
      </button>
    </div>
  );
};

export default Login;
