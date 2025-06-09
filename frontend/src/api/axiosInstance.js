import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ Points to your backend server
});

export default instance;
