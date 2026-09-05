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

      if (e.key >= "0" && e.key <= "4") {
        const idx = Number(e.key);
        const next = VIEWS[idx];
        if (next) {
          e.preventDefault();
          setView(next);
        }
        return;
      }

      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((n) => Math.min(count - 1, n + 1));
        return;
      }
      if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((n) => Math.max(0, n - 1));
        return;
      }
      if (e.key === "y") {
        e.preventDefault();
        onYank();
        return;
      }
      if (e.key === "d") {
        e.preventDefault();
        onDownload();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, setView, setSelected, count, onYank, onDownload]);
}
