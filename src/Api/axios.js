import axios from "axios";

const axiosInstance = axios.create({
  // local instance of firebase functions
  // baseURL: "http://127.0.0.1:5001/clone-5dab2/us-central1/api",
  // deployed version of amazon server on render
  baseURL: "https://amazon-api-deploy-brkh.onrender.com/"
});

export {axiosInstance}