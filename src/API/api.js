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


export async function getMembersByFamilyId(familyId) {
    const response = await api.get(`/members/families/${familyId}`);
    return response.data;
}

export async function getMemberTasks(memberId) {
    const response = await api.get(`/members/${memberId}/tasks`);
    return response.data;
}

export async function getMemberResources(memberId) {
    const response = await api.get(`/members/${memberId}/resources`);
    return response.data;
}

export async function getMemberIncomes(memberId) {
    const response = await api.get(`/members/${memberId}/incomes`);
    return response.data;
}

export async function getMemberExpenses(memberId) {
    const response = await api.get(`/members/${memberId}/expenses`);
    return response.data;
}

export async function getMemberFamily(memberId) {
    const response = await api.get(`/members/${memberId}/family`);
    return response.data;
}

export async function getMemberRoles(memberId) {
    const response = await api.get(`/members/${memberId}/roles`);
    return response.data;
}

export async function getMemberSavings(memberId) {
    const response = await api.get(`/members/${memberId}/savings`);
    return response.data;
}

export async function getMemberSkills(memberId) {
    const response = await api.get(`/members/${memberId}/skills`);
    return response.data;
}
export async function getAllFamilies() {
    const response = await api.get('/families');
    return response.data;
}

export async function createFamily(family) {
    const response = await api.post('/families', family);
    return response.data;
}

export async function updateFamily(family) {
    const response = await api.put(`/families/${family.FamilyID}`, family);
    return response.data;
}

export async function deleteFamily(familyId) {
    const response = await api.delete(`/families/${familyId}`);
    return response.data;
}