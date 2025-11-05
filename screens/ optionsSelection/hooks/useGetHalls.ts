import { getHalls } from "@/api/services/halls";
import { Hall } from "@/types/hall/hall";
import { useQuery } from "@tanstack/react-query";

export function useGetHalls(cinemaId: string | null) {
  return useQuery<Hall[], Error, Hall[], ["halls", string]>({
    queryKey: ["halls", cinemaId ?? ""],
    queryFn: async (): Promise<Hall[]> => {
      if (!cinemaId) return [] as Hall[];
      return getHalls(cinemaId);
    },
    enabled: !!cinemaId,
    staleTime: 0,
    gcTime: 0,
  });
}


