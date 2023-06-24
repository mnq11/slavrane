// api.js
import axios from 'axios';

export async function loginUser(email, password) {
    const response = await axios.post(process.env.REACT_APP_API_URL + '/users/login', { email, password });
    return response.data;
}
