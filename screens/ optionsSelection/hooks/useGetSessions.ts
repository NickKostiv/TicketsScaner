import { getSessions } from "@/api/services/sessions";
import { HallSession } from "@/types/session/session";
import { getDateRangeForDay } from "@/utils/getDate";

import { useQuery } from "@tanstack/react-query";

export function useGetSessions(cinemaId: string | null, hallId: string | null) {
  const { dateFrom, dateTo } = getDateRangeForDay();

  return useQuery<HallSession[], Error>({
    queryKey: ["sessions", cinemaId ?? "", hallId ?? ""],
    queryFn: async (): Promise<HallSession[]> => {
      if (!cinemaId || !hallId) return [] as HallSession[];
      return getSessions({ filters: { hallId, cinemaId, dateFrom, dateTo } });
    },
    enabled: !!cinemaId && !!hallId,
    staleTime: 0,
    gcTime: 0,
  });
}
