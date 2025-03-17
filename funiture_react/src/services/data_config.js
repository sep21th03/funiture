import axios from "axios";

const BASE_URL = 'https://codetify.funiture.local/'

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;


// func example

/* 

export const login = async ({ email, password }) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    throw error;
  }
};

*/
