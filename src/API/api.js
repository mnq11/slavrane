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
    if (error.response && error.response.data && error.response.data.message) {
        let errorMessage = error.response.data.message;
        if (error.response.data.errors) {
            errorMessage += ': ' + error.response.data.errors.join(', ');
        }
        throw new Error(errorMessage);
    } else {
        throw new Error("An error occurred while processing your request.");
    }
});


export async function loginMember(email, password) {
    const response = await api.post('/members/login', { email, password });
    return response.data;
}


export async function registerMember(values) {
    const response = await api.post('/members', values);
    return response.data;
}


export async function getMembersByFamilyId(familyId) {
    const response = await api.get(`/members/families/${familyId}`);
    return response.data;
}

export async function getAllFamilies() {
    const response = await api.get('/families/getFamilies');
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
export async function createMember(member) {
    const response = await api.post('/members/register', {
        ...member,
        FamilyID: parseInt(member.FamilyID), // ensure FamilyID is an integer
    });
    return response.data;
}


export async function updateMember(member) {
    const response = await api.put(`/members/${member.MemberID}`, member);
    console.log('Api log :for update Member' ,response.data);

    return response.data;
}

export async function deleteMember(memberId) {
    const response = await api.delete(`/members/${memberId}`);
    return response.data;
}
export async function createTask(task) {
    const response = await api.post('/tasks', task);
    return response.data;
}

export async function updateTask(task) {
    const response = await api.put(`/tasks/${task.TaskID}`, task);
    return response.data;
}

export async function deleteTask(taskId) {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
}
export const getTasksForMember = async (memberId) => {
    const response = await api.get(`/members/${memberId}/tasks`);
    return response.data;
};
