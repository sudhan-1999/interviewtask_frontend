import axios from "axios";

const API = axios.create({
  baseURL: "https://interviewtask-backend.onrender.com/api"
});

export default API;
