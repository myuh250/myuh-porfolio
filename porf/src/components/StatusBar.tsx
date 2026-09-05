import { events, engineer, type ViewId } from "../data/cv";
import { useEffect, useState } from "react";

type Props = {
  view: ViewId
  toast: string | null
};

export function StatusBar({ view, toast }: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % events.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  const ev = events[i];
  const viewIndex = ["overview", "workloads", "ingress", "certs", "nodes"].indexOf(
    view,
  );

  return (
    <footer className="status">
      <span className="status-fixed">
        [{viewIndex}:{view}]
      </span>
      <span className="status-fixed">
        ns:<b style={{ color: "var(--text)", fontWeight: 500 }}> {engineer.namespace}</b>
      </span>
      <span className="status-ctx">ctx:{engineer.context}</span>
      {toast ? (
        <span className="toast">copied yaml · {toast}</span>
      ) : (
        <span className="status-event">
          {ev.ts}{" "}
          <span className="reason">{ev.reason}</span> {ev.resource} — {ev.message}
        </span>
      )}
      <span className="status-keys">0-4 views · j/k select · y yaml · d cv</span>
    </footer>
  );
}
