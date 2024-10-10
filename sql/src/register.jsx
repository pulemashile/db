import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';  // Ensure this imports the CSS with the styles

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/register', { username, password });
            alert('Registration successful');
            navigate('/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className="register">
            <form onSubmit={handleRegister}>
                <h2 className="title">Sign up</h2>
                <input
                    className="input-field"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="input-field"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="submit-button" type="submit">Register</button>
                <div className="link-container">
                    <p>Already registered?</p>
                    <Link to="/login" className="link">Click here to login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
