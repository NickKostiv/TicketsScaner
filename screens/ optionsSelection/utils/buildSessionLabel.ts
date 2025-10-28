import { HallSession } from "@/types/session";
import { formatLocalTimeHHmm } from "@/utils/getDate";

const truncate = (text: string, max: number) =>
    text.length > max ? text.slice(0, max - 1) + "…" : text;

export const buildSessionLabel = (s: HallSession) => {
    const time = formatLocalTimeHHmm(s.start);
    const title = truncate(s.movie.title, 30);
   
  
    return `${time} • ${title}`;
  };