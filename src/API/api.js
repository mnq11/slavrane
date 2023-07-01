// api.js
import axios from 'axios';

export async function loginUser(email, password) {
    const response = await axios.post(process.env.REACT_APP_API_URL + '/login', { email, password });
    return response.data;
}

export async function registerMember(values) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/members/register', values);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw new Error("Email already in use.");
        } else {
            throw new Error("An error occurred while registering");
        }
    }
}
