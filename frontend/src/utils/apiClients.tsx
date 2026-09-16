import axios from "axios";

export const apiClient = axios.create({
  baseURL: "", // Leave blank if your config constants use absolute URLs, or set your base server URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
