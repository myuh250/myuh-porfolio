import { engineer } from "../data/cv";

export function TopBar() {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-k9s">k9s</span>
      </div>
      <span className="kv">
        ctx: <b>{engineer.context}</b>
      </span>
      <span className="kv">
        ns: <b>{engineer.namespace}</b>
      </span>
      <div className="topbar-tags">
        <span className="tag tag-devops">devops</span>
        <span className="tag tag-sre">sre</span>
        <span className="tag tag-k8s">k8s</span>
        <span className="tag tag-cloud">cloud</span>
        <span className="tag tag-ai">ai</span>
      </div>
    </header>
  );
}
