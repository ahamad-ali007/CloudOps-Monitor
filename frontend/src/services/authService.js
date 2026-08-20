import api from "./api";

export const login = async (username, password) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });

  const { access_token } = response.data;

  localStorage.setItem("access_token", access_token);

  return response.data;
};

export const register = async (username, email, password) => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};