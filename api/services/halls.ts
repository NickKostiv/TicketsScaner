import { Hall } from "@/types/hall";
import axios, { AxiosInstance } from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const hallsInstance: AxiosInstance = axios.create({
  baseURL: `${API_URL}/halls`,
  headers: { "Content-Type": "application/json" },
});

export const getHalls = async (): Promise<Hall[]> => {
  return await hallsInstance.post("");
};
