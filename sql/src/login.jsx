import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';  

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            localStorage.setItem('token', response.data.token);
            onLogin();
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <h2 className="title">Sign in</h2>
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
                <button className="submit-button" type="submit">Login</button>
                <div className="link-container">
                    <p>Don't have an account?</p>
                    <Link to="/register" className="link">Click here to register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
