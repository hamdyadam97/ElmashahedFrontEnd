// src/services/authService.js
import api from "../../api/Api"; // بدلاً من axios

export const signup = async (formData) => {
  const res = await api.post("user/ ", formData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await api.post("user/login/", credentials);
  return res.data.data;
};
