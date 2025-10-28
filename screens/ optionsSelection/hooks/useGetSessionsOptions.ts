import { useEffect, useState } from "react";
import { getSessions } from "@/api/services/sessions";
import { formatLocalTimeHHmm, getDateRangeForDay } from "@/utils/getDate";

type Option = { label: string; value: string; time: string; title: string };

export function useGetSessionsOptions(cinemaId: string | null, hallId: string | null) {
  const [sessionOptions, setSessionOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const { dateFrom, dateTo } = getDateRangeForDay();

  useEffect(() => {
    setSessionOptions([]);
    if (!cinemaId || !hallId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    const getSessionsOptions = async () => {
      try {
        const sessions = await getSessions({ page: 1, limit: 50, filters: { hallId, cinemaId, dateFrom, dateTo }});
        if (cancelled) return;
        setSessionOptions(
          sessions.map((s) => {
            const time = formatLocalTimeHHmm(s.start);
            const title = s.movie.title.length > 30 ? s.movie.title.slice(0, 29) + "…" : s.movie.title;
            return { label: `${time} • ${title}`, value: s.id, time, title };
          })
        );
      } catch (e) {
        if (cancelled) return;
        setError(e);
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    };  
    getSessionsOptions();

    return () => {
      cancelled = true;
    };
  }, [cinemaId, hallId]);

  return { sessionOptions, loading, error };
}


