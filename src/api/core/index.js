import axios from "axios";

const request = axios.create({
  baseURL: `https://www.pre-onboarding-selection-task.shop/`,
  timeout: 5000,

  headers: {
    accept: "application/json",
    // Authorization: `Bearer ${window.localStorage.getItem(JWT_KEY)}`,
  },
});

export default request;
