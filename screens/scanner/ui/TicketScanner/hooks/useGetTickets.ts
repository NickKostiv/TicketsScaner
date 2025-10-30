import { getTickets } from "@/api/services/tickets";
import { Ticket } from "@/types/ticket/ticket";
import { useQuery } from "@tanstack/react-query";


export function useGetTickets(barcode: number | null, enabled: boolean) {
    return useQuery<Ticket[], Error>({
        queryKey: ['tickets', barcode],
        queryFn: async (): Promise<Ticket[]> => {
            if (!barcode) return []
            return getTickets({ filters: { barcode } })
        },
        staleTime: 0,
        gcTime: 0,
        enabled: !!barcode && enabled,
        
    })
}