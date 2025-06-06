import { LoginData, LoginResponse } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const authInstance: AxiosInstance = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: { "Content-Type": "application/json" },
});

authInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (body: LoginData): Promise<LoginResponse> => {
  const { data } = await authInstance.post("/crm/login", body);
  return data;
};

export const logout = async (): Promise<void> => {
  return await authInstance.post("/logout");
};
