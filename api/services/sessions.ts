import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constants/apiURL";
import { HallSession } from "@/types/session/session";


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
    //   ...(params.sort ? { sort: params.sort.map((sort) => `${sort.orderBy}:${sort.order}`).join(',') } : {}),
      ...(params.page ? { page: params.page } : {}),
      ...(params.limit ? { limit: params.limit } : {}),
      },
    });
  console.log('Sessions data', data);
  return data.data;
};