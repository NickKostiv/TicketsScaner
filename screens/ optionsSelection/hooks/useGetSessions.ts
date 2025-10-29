import { getSessions } from "@/api/services/sessions";
import { formatLocalTimeHHmm, getDateRangeForDay } from "@/utils/getDate";
import { HallSession } from "@/types/session";
import { useQuery } from "@tanstack/react-query";

type Option = { label: string; value: string; time: string; title: string };

export function useGetSessionsOptions(
  cinemaId: string | null,
  hallId: string | null
) {
  const { dateFrom, dateTo } = getDateRangeForDay();

  return useQuery<HallSession[], Error, Option[]>({
    queryKey: ["sessions", cinemaId, hallId],
    queryFn: async () => {
      if (!cinemaId || !hallId) return [];
      return getSessions({ filters: { hallId, cinemaId, dateFrom, dateTo } });
    },
    select: (sessions: HallSession[]): Option[] =>
      sessions.map((s) => ({
        label: `${formatLocalTimeHHmm(s.start)} • ${s.movie.title}`,
        value: s.id,
        time: formatLocalTimeHHmm(s.start),
        title:
          s.movie.title.length > 25
            ? s.movie.title.slice(0, 24) + "…"
            : s.movie.title,
      })),
    enabled: !!cinemaId && !!hallId,
    staleTime: 0,
    gcTime: 0,
  });
}
