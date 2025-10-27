import AsyncStorage from "@react-native-async-storage/async-storage";

export type CrmJwtPayload = {
  cinemaId?: string | null;
  [key: string]: unknown;
};

function base64UrlDecode(input: string): string {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "===".slice((normalized.length + 3) % 4);
  let binary: string;
  try {
    // React Native often has global atob
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const atobFn: ((b64: string) => string) | undefined = globalThis.atob;
    if (atobFn) {
      binary = atobFn(padded);
    } else {
      // Fallback to Buffer if available
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { Buffer } = require("buffer");
      binary = Buffer.from(padded, "base64").toString("binary");
    }
  } catch {
    // As a final fallback, return empty string to fail decode gracefully
    return "";
  }

  // Convert binary string to UTF-8 string
  try {
    const percentEncoded = Array.prototype.map
      .call(binary, (c: string) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
      .join("");
    return decodeURIComponent(percentEncoded);
  } catch {
    return binary;
  }
}

export function decodeJwtPayload<TPayload = CrmJwtPayload>(token: string): TPayload | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  const payloadB64 = parts[1];
  try {
    const json = base64UrlDecode(payloadB64);
    if (!json) return null;
    return JSON.parse(json) as TPayload;
  } catch {
    return null;
  }
}

export function getCinemaIdFromToken(token: string): string | null {
  const payload = decodeJwtPayload<CrmJwtPayload & {
    cinema_id?: string | null;
    cinema?: string | { id?: string } | null;
  }>(token);
  if (!payload) return null;

  const direct = (payload as any).cinemaId ?? (payload as any).cinema_id;
  if (typeof direct === 'string' && direct) return direct;

  const cinema = (payload as any).cinema;
  if (typeof cinema === 'string' && cinema) return cinema;
  if (cinema && typeof cinema === 'object' && typeof cinema.id === 'string') return cinema.id;

  return null;
}

export async function getStoredCinemaId(): Promise<string | null> {
  const token = await AsyncStorage.getItem("accessToken");
  if (!token) return null;
  return getCinemaIdFromToken(token);
}


