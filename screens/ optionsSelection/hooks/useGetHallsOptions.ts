import { getHalls } from "@/api/services/halls";
import { Hall } from "@/types/hall";
import { useQuery } from "@tanstack/react-query";

type Option = { label: string; value: string };

export function useGetHallsOptions(cinemaId: string | null) {
  return useQuery<Hall[], Error, Option[]>({
    queryKey: ["halls", cinemaId ?? ""],
    queryFn: async (): Promise<Hall[]> => {
      if (!cinemaId) return [] as Hall[];
      return getHalls(cinemaId);
    },
    select: (halls: Hall[]): Option[] =>
      halls.map((hall) => ({ label: hall.name, value: hall.id })),
    enabled: !!cinemaId,
    staleTime: 0,
    gcTime: 0,
  });
}
