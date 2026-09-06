import { formatLabels, keywordsFor, type Workload } from "../data/cv";
import { highlightKeywords } from "../lib/highlight";
import { ScrollArea } from "./ScrollArea";

export function DescribePane({ workload }: { workload: Workload }) {
  const keywords = keywordsFor(workload);

  return (
    <aside className="panel describe-card">
      <div className="panel-h">
        <span>describe {workload.name}</span>
        <span>{workload.status}</span>
      </div>
      <ScrollArea className="describe">
        <div className="describe-meta">
          <div className="title">{workload.title}</div>
          {workload.role !== workload.title ? (
            <div className="sub">{workload.role}</div>
          ) : null}
          <div className="sub">
            {workload.org} · {workload.location}
          </div>
          <div className="sub">{formatLabels(workload.labels)}</div>
        </div>
        <ul className="highlights">
          {workload.highlights.map((h) => (
            <li key={h}>{highlightKeywords(h, keywords)}</li>
          ))}
        </ul>
      </ScrollArea>
    </aside>
  );
}
