const PREFIX = "filazero:cache:";

type Envelope<T> = { at: number; data: T };

export function readCache<T>(key: string): { data: T; at: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Envelope<T>;
    if (!parsed || typeof parsed.at !== "number") return null;
    return { data: parsed.data, at: parsed.at };
  } catch {
    return null;
  }
}

export function writeCache<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage cheio ou indisponível: seguimos sem cache */
  }
}

export function formatarHorario(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
