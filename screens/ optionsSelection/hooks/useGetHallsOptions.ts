import { useEffect, useState } from "react";
import { getHalls } from "@/api/services/halls";

type Option = { label: string; value: string };

export function useGetHallsOptions(cinemaId: string | null) {
  const [hallOptions, setHallOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!cinemaId) {
      setHallOptions([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    const getHallsOptions = async () => {
      try {
        const halls = await getHalls(cinemaId);
        if (cancelled) return;
        setHallOptions(
          halls.map((hall) => ({ label: hall.name, value: hall.id }))
        );
      } catch (e) {
        if (cancelled) return;
        setError(e);
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    };

    getHallsOptions();

    return () => {
      cancelled = true;
    };
  }, [cinemaId]);

  return { hallOptions, loading, error };
}


