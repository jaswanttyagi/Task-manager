import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "/api/v1";

export const signupUser = async (formData) => {
  const response = await axios.post(`${API_URL}/signup`, formData);
  return response.data;
};

export const loginUser = async (formData) => {
  const response = await axios.post(`${API_URL}/login`, formData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/logout`);
  return response.data;
};
