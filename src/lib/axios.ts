import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

let interceptorId: number | null = null;

export const setupAxiosInterceptors = (
  getTokenRef: () => React.MutableRefObject<string | null>,
) => {
  if (interceptorId !== null) {
    api.interceptors.request.eject(interceptorId);
  }

  interceptorId = api.interceptors.request.use(
    (config) => {
      const token = getTokenRef().current;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
};

export const clearAxiosInterceptor = () => {
  if (interceptorId !== null) {
    api.interceptors.request.eject(interceptorId);
    interceptorId = null;
  }
};
