// api.js
import axios from 'axios';

// Create a custom axios instance
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 400) {
        throw new Error("Email already in use.");
    } else {
        throw new Error("An error occurred while processing your request.");
    }
});

export async function loginMember(email, password) {
    const response = await api.post('/members/login', { email, password });
    return response.data;
}


export async function registerMember(values) {
    const response = await api.post('/members/register', values);
    return response.data;
}

export async function getAllFamilies() {
    const response = await api.get('/members/families');
    return response.data;
}
export async function getMembersByFamilyId(familyId) {
    const response = await api.get(`/members/families/${familyId}`);
    return response.data;
}
export async function getMemberById(id) {
    const response = await api.get(`/members/${id}`);
    return response.data;
}

export async function createMember(member) {
    const response = await api.post('/members', member);
    return response.data;
}

export async function updateMember(id, updates) {
    const response = await api.put(`/members/${id}`, updates);
    return response.data;
}

export async function deleteMember(id) {
    const response = await api.delete(`/members/${id}`);
    return response.data;
}
