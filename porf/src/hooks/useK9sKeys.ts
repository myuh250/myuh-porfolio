import { useEffect } from "react";
import { VIEWS, type ViewId } from "../data/cv";

type Args = {
  view: ViewId
  setView: (v: ViewId) => void
  setSelected: (n: number | ((prev: number) => number)) => void
  count: number
  onYank: () => void
  onDownload: () => void
};

export function useK9sKeys({
  view,
  setView,
  setSelected,
  count,
  onYank,
  onDownload,
}: Args) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const code = e.code;

      if (e.key >= "0" && e.key <= "4") {
        const idx = Number(e.key);
        const next = VIEWS[idx];
        if (next) {
          e.preventDefault();
          setView(next);
        }
        return;
      }

      const down =
        key === "j" || key === "ArrowDown" || code === "KeyJ" || code === "ArrowDown";
      const up =
        key === "k" || key === "ArrowUp" || code === "KeyK" || code === "ArrowUp";

      if (down || up) {
        e.preventDefault();
        if (count <= 1) {
          const idx = VIEWS.indexOf(view);
          const next = down
            ? (idx + 1) % VIEWS.length
            : (idx - 1 + VIEWS.length) % VIEWS.length;
          setView(VIEWS[next]);
          return;
        }
        setSelected((n) => {
          if (down) return (n + 1) % count;
          return (n - 1 + count) % count;
        });
        return;
      }
      if (key === "y" || code === "KeyY") {
        e.preventDefault();
        onYank();
        return;
      }
      if (key === "d" || code === "KeyD") {
        e.preventDefault();
        onDownload();
      }
    };

    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [view, setView, setSelected, count, onYank, onDownload]);
}
