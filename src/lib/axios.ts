import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const setupAxiosInterceptors = () => {
  api.interceptors.request.use(
    (config) => {
      const authToken = localStorage.getItem("authorizationToken");
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};
