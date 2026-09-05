import { VIEWS, type ViewId } from "../data/cv";

type Props = {
  view: ViewId
  onChange: (v: ViewId) => void
};

export function ViewTabs({ view, onChange }: Props) {
  return (
    <nav className="view-tabs" aria-label="Cluster views">
      {VIEWS.map((id, i) => (
        <button
          key={id}
          type="button"
          className={`view-tab${view === id ? " active" : ""}`}
          onClick={() => onChange(id)}
          aria-current={view === id ? "page" : undefined}
        >
          <kbd>{i}</kbd>
          {id}
        </button>
      ))}
    </nav>
  );
}
