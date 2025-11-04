import { HallSession } from "@/types/session/session";
import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constants/apiURL";


const sessionsInstance: AxiosInstance = axios.create({
  baseURL: `${API_URL}/management/hall-session`,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

type SortItem = { orderBy: string; order: 'ASC' | 'DESC' };

type SessionListParams = {
  filters?: {
    hallId?: string;
    dateFrom?: string;
    dateTo?: string;
    cinemaId?: string;
  };
  sort?: SortItem[];
  page?: number;
  limit?: number;
};

export const getSessions = async (params: SessionListParams): Promise<HallSession[]> => {
  const { data } = await sessionsInstance.get("", {
    params: {
      ...(params.filters ? { filters: JSON.stringify(params.filters) } : {}),
      ...(params.page ? { page: params.page } : {}),
      ...(params.limit ? { limit: params.limit } : {}),
    },
  });
  return data.data;
};