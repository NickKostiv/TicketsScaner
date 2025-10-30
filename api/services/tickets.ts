import { Ticket } from "@/types/ticket/ticket";
import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constants/apiURL";
import apiInstance from "./instance";

type SortItem = { orderBy: string; order: 'ASC' | 'DESC' };

export type TicketsListParams ={
    filters?: {
        barcode: number;
      };
      sort?: SortItem[];
      page?: number;
      limit?: number;
}

// const ticketsInstance: AxiosInstance = axios.create({
//     baseURL: `${API_URL}/tickets`,
//     headers: { "Content-Type": "application/json", Accept: "application/json" },
// })


export const getTickets = async (params: TicketsListParams): Promise<Ticket[]> => {
    const {data } = await apiInstance.get('/tickets', {
        params: {
            ...(params.filters ? { filters: JSON.stringify(params.filters) } : {}),
          //   ...(params.sort ? { sort: params.sort.map((sort) => `${sort.orderBy}:${sort.order}`).join(',') } : {}),
            ...(params.page ? { page: params.page } : {}),
            ...(params.limit ? { limit: params.limit } : {}),
            },
    })

    return data.data;

}