import axios from 'axios';

const API_URL = 'http://192.168.1.7:5000/api'; // Update with your backend URL

export const getStudents = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/students?page=${page}&limit=${limit}`);
  return response.data;
};

export const getStudentById = async (id) => {
  const response = await axios.get(`${API_URL}/students/fetch/${id}`);
  return response.data;
};

export const createStudent = async (studentData) => {
  const response = await axios.post(`${API_URL}/students`, studentData);
  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await axios.put(`${API_URL}/students/${id}`, studentData);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await axios.delete(`${API_URL}/students/${id}`);
  return response.data;
};