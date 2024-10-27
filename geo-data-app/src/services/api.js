import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Function to get the current token
const getToken = () => localStorage.getItem('token');

// Function to create headers with the current token
const createHeaders = () => {
    return {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${getToken()}`, // Always get the current token
    };
};

export const login = async (username, password) => {
    return await axios.post(`${API_URL}/auth/login`, { username, password }, { headers: createHeaders() });
};

export const register = async (username, password) => {
    return await axios.post(`${API_URL}/auth/register`, { username, password }, { headers: createHeaders() });
};

export const validateToken = async () => {
    return await axios.post(`${API_URL}/auth/validate-token`, {}, { headers: createHeaders() });
};

export const uploadFile = async (formData) => {
    return await axios.post(`${API_URL}/files/upload`, formData, {headers: {
        'Content-type': 'multipart/form-data',
        'Authorization': `Bearer ${getToken()}`
    }});
};

export const getUserFiles = async () => {
    return await axios.get(`${API_URL}/files/get-user-files`, {headers: {
        'Authorization': `Bearer ${getToken()}`
    }});
};

