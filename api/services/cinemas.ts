import { Cinema } from "@/types/cinema/cinema";
import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constants/apiURL";

const cinamesInstance: AxiosInstance = axios.create({
    baseURL: `${API_URL}/cinemas`,
    headers: { "Content-Type": "application/json" },
});

export const getCinemas = async (): Promise<Cinema[]> => {
    const { data } = await cinamesInstance.get("", {
        params: { filters: { limit: 100 } }
    });
    return data.data;
}