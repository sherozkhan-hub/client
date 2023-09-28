import axios from "axios";
import { useSelector } from "react-redux";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8800/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const { user } = useSelector((state) => state.user); // Wrap this in a hook
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`; // Use template literals
      config.headers["Content-Type"] = "application/json";
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Access-Control-Allow-Methods"] =
        "GET,PUT,POST,DELETE,PATCH,OPTIONS";
    }

    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);
