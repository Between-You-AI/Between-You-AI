import {AxiosRequestConfig} from "axios";

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});
