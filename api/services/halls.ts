import { Hall } from "@/types/hall";
import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constants/apiURL";



const hallsInstance: AxiosInstance = axios.create({
  baseURL: `${API_URL}/halls`,
  headers: { "Content-Type": "application/json" },
});

export const getHalls = async (cinemaId: string): Promise<Hall[]> => {
  const { data } = await hallsInstance.get("", {
    params: { filters: JSON.stringify({ cinemaId }) },
  });
  console.log('Halls data', data);
  return data.data;
};
