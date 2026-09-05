import { engineer } from "../data/cv";

export function TopBar() {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-k9s">k9s</span>
        <span className="brand-dot">│</span>
        <span>portfolio</span>
      </div>
      <span className="kv">
        ctx: <b>{engineer.context}</b>
      </span>
      <span className="kv">
        ns: <b>{engineer.namespace}</b>
      </span>
      <span className="badge" title={engineer.badge}>
        AWS {engineer.certCode}
      </span>
      <div className="topbar-right">
        <span className="kv">{engineer.location}</span>
      </div>
    </header>
  );
}
