import { useCallback, useEffect, useState } from "react";

export type DraftLine = { slug: string; cases: number };

const KEY = "swan-wholesale-order-draft";
const EVT = "swan-order-draft-change";

function read(): DraftLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as DraftLine[]) : [];
  } catch {
    return [];
  }
}

function write(lines: DraftLine[]) {
  window.localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(EVT));
}

/**
 * Order draft kept in the browser so a buyer can build an order before we
 * have accounts wired up. Reads only after hydration to avoid SSR mismatch.
 */
export function useOrderDraft() {
  const [lines, setLines] = useState<DraftLine[]>([]);

  useEffect(() => {
    const sync = () => setLines(read());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setCases = useCallback((slug: string, cases: number) => {
    const next = read().filter((l) => l.slug !== slug);
    if (cases > 0) next.push({ slug, cases });
    write(next);
  }, []);

  const addCases = useCallback((slug: string, delta: number) => {
    const current = read();
    const existing = current.find((l) => l.slug === slug);
    const next = current.filter((l) => l.slug !== slug);
    const total = Math.max(0, (existing?.cases ?? 0) + delta);
    if (total > 0) next.push({ slug, cases: total });
    write(next);
  }, []);

  const clear = useCallback(() => write([]), []);

  const totalCases = lines.reduce((sum, l) => sum + l.cases, 0);

  return { lines, setCases, addCases, clear, totalCases };
}