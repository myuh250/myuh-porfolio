import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Options = {
  charMs?: number
  linePauseMs?: number
  startDelayMs?: number
};

export function useTypewriter(lines: string[], opts: Options = {}) {
  const charMs = opts.charMs ?? 8;
  const linePauseMs = opts.linePauseMs ?? 50;
  const startDelayMs = opts.startDelayMs ?? 180;

  const full = useMemo(() => lines.join("\n"), [lines]);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const skipped = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    skipped.current = false;
    setCount(0);
    setDone(false);
    let i = 0;

    const tick = () => {
      if (skipped.current) return;
      i += 1;
      setCount(i);
      if (i >= full.length) {
        setDone(true);
        return;
      }
      const ch = full[i - 1];
      const delay = ch === "\n" ? linePauseMs : charMs;
      timer.current = window.setTimeout(tick, delay);
    };

    timer.current = window.setTimeout(tick, startDelayMs);
    return () => {
      if (timer.current !== undefined) window.clearTimeout(timer.current);
    };
  }, [full, charMs, linePauseMs, startDelayMs]);

  const skip = useCallback(() => {
    skipped.current = true;
    if (timer.current !== undefined) window.clearTimeout(timer.current);
    setCount(full.length);
    setDone(true);
  }, [full.length]);

  return { text: full.slice(0, count), done, skip };
}
