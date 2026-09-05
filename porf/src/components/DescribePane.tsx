import { formatLabels, type Workload } from "../data/cv";
import { workloadToYaml } from "../lib/yaml";
import { ArchStrip } from "./ArchStrip";
import { YamlBlock } from "./YamlBlock";

export function DescribePane({ workload }: { workload: Workload }) {
  return (
    <aside className="panel">
      <div className="panel-h">
        <span>describe {workload.name}</span>
        <span>{workload.status}</span>
      </div>
      <div className="describe">
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
        {workload.arch ? <ArchStrip variant={workload.arch} /> : null}
        <ul className="highlights">
          {workload.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="arch-label" style={{ marginTop: 14 }}>
          manifest
        </div>
        <YamlBlock text={workloadToYaml(workload, { highlights: false })} />
      </div>
    </aside>
  );
}
