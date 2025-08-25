import { config } from "@/config";
import axios from "axios";


export const AxiosInstance = axios.create({
  baseURL: config.baseUrl,
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
AxiosInstance.interceptors.response.use(function onFulfilled(response) {
    return response;
  }, function onRejected(error) {
    return Promise.reject(error);
  });
