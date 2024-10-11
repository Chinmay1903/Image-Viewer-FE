import React from 'react';
import { logout } from '../api';

interface LogoutProps {
    setToken: (token: string | null) => void;
}

const Logout: React.FC<LogoutProps> = ({ setToken }) => {
    const handleLogout = () => {
        logout();
        setToken(null);
    };

    return <button type='button' className='btn btn-danger' onClick={handleLogout}>Logout</button>;
};

export default Logout;
