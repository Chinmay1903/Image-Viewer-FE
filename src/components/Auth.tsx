import React, { useState } from 'react';
import { login, register } from '../api';

interface AuthProps {
    setToken: (token: string|null) => void;
}

const Auth: React.FC<AuthProps> = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                await register(username, password);
                alert('Registration successful, please log in');
                setIsRegistering(false); // Switch to login after successful registration
                setUsername('');
                setPassword('');
            } else {
                const data = await login(username, password);
                setToken(data.access);
                localStorage.setItem('access-token', data.access); // Store token in localStorage for persistence
                localStorage.setItem('refresh-token', data.refresh); // Store token in localStorage for persistence
            }
        } catch (error) {
            console.log(error);
            setToken(null);
            setError(error.response.data.message);
        }
    };

    return (
        <div className='container mx-auto'>
            <h2 className='text-center my-4'>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit} className='mb-5'>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='d-flex justify-content-between'>
                    <button type="submit" className="btn btn-primary">{isRegistering ? 'Register' : 'Login'}</button>
                    <button type="button" className="btn btn-primary" onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}</button>
                </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Auth;
