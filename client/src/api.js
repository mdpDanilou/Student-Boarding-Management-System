import axios from 'axios';

// The baseURL handles the 'http://localhost:5000/api' prefix for all calls
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// --- Student Management ---
export const fetchStudents = () => API.get('/students');
export const addStudent = (data) => API.post('/students', data);
export const updateStudent = (id, data) => API.put(`/students/${id}`, data);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

// --- Auth (Login/Register) ---
// These will hit http://localhost:5000/api/auth/login and /register
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);

export default API;