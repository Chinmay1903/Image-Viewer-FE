import axios from 'axios';

// Base URL
const BASE_URL = 'http://127.0.0.1:7000/api';

// Login function using axios
export const login = async (username: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/user/login/`, {
        'username': username,
        'password' : password
    }, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};

// Register function using axios
export const register = async (username: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/user/register/`, {
        'username': username,
        'password' : password
    }, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};

// Logout function
export const logout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
};

// Access Token Check
export const checkToken = async (token: string) => {
    const response = await axios.post(`${BASE_URL}/user/verify-token/`, {
        'token': token,
    }, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};

// Get New Access Token
export const getToken = async (refresh: string) => {
    const response = await axios.post(`${BASE_URL}/user/verify-token/`, {
        'refresh': refresh,
    }, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};

// Upload image using axios
export const uploadImage = async (file: File, token: string) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await axios.post(`${BASE_URL}/image/upload/`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

// Get images using axios
export const getImages = async (token: string) => {
    const response = await axios.get(`${BASE_URL}/image/get/`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
};
