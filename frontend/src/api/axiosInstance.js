import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-commerce-p8yp.onrender.com/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
