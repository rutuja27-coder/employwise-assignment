// src/services/api.js
import axios from "axios";

const API_URL = "https://reqres.in/api";

export const loginUser = async (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const fetchUsers = async (page) => {
  return axios.get(`${API_URL}/users?page=${page}`);
};

export const updateUser = async (id, userData) => {
  return axios.put(`${API_URL}/users/${id}`, userData);
};

export const deleteUser = async (id) => {
  return axios.delete(`${API_URL}/users/${id}`);
};
