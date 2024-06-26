import axios from "axios";
import router from "./router";
import { server } from "./server";

const axiosClient = axios.create({
  baseURL: `${server}`,
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("TOKEN");
      window.location.reload();
      return error;
    }
    throw error;
  }
);

export default axiosClient;
