import { getCinemas } from "@/api/services/cinemas"
import { useQuery } from "@tanstack/react-query"


export const useGetCinemas = () => {
    return useQuery({
        queryKey: ['cinemas'],
        queryFn: () => getCinemas(),
        staleTime: 0,
        gcTime: 0,
    })
}