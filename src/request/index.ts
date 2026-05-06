import axios from "axios";

export interface IRequestRes<T = any> {
  code: number;
  message: string;
  data: T;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token") || '""');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    response.data.code = Number(response.data.code);

    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
