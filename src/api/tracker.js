import axios from "axios";
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://1ec795a9ce69.ngrok.io"
});

instance.interceptors.request.use(
  // called with every request
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  // called with every failed req
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
