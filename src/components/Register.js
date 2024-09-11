// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        verifyPassword: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/authentication/register', formData);
            // Handle successful registration
            navigate('/login'); // Redirect to login page
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <label>Verify Password</label>
                    <input type="password" name="verifyPassword" value={formData.verifyPassword} onChange={handleChange} />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <button type="submit">Register</button>
            </form>
            <button onClick={() => navigate('/login')}>Login</button> {/* Login button */}
        </div>
    );
};

export default Register;
