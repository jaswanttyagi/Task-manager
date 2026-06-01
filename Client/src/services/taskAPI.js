import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "/api/v1";

const getAuthHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getTasks = async (token) => {
  const response = await axios.get(`${API_URL}/tasks`, getAuthHeader(token));
  return response.data;
};

export const createTask = async (taskData, token) => {
  const response = await axios.post(`${API_URL}/tasks`, taskData, getAuthHeader(token));
  return response.data;
};

export const updateTask = async (taskId, taskData, token) => {
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, getAuthHeader(token));
  return response.data;
};

export const deleteTask = async (taskId, token) => {
  const response = await axios.delete(`${API_URL}/tasks/${taskId}`, getAuthHeader(token));
  return response.data;
};
