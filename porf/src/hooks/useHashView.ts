import { useEffect, useState } from "react";
import { VIEWS, type ViewId } from "../data/cv";

function parseHash(): ViewId {
  const raw = window.location.hash.replace(/^#/, "");
  return (VIEWS as readonly string[]).includes(raw) ? (raw as ViewId) : "overview";
}

export function useHashView() {
  const [view, setViewState] = useState<ViewId>(parseHash);

  useEffect(() => {
    const onHash = () => setViewState(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setView = (next: ViewId) => {
    setViewState(next);
    if (window.location.hash.replace(/^#/, "") !== next) {
      window.history.replaceState(null, "", `#${next}`);
    }
  };

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#overview");
    }
  }, []);

  return { view, setView };
}
