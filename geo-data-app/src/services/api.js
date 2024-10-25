import axios from 'axios';

const API_URL = 'http://localhost:5000';

const token = localStorage.getItem('token');

const headers = {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${token}`
}

export const login = async (username, password) => {
    return await axios.post(`${API_URL}/auth/login`, { username, password }, {headers: headers});
};

export const register = async (username, password) => {
    return await axios.post(`${API_URL}/auth/register`, { username, password }, {headers: headers});
};

export const uploadFile = async (formData) => {
    return await axios.post(`${API_URL}/files/upload`, formData, {headers: {
        'Content-type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    }});
};

export const getUserFiles = async () => {
    return await axios.get(`${API_URL}/files/get-user-files`, {headers: {
        'Authorization': `Bearer ${token}`
    }});
};

