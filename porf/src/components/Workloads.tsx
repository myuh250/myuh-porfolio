import { formatLabels, workloads } from "../data/cv";
import { DescribePane } from "./DescribePane";
import { ManifestCard } from "./ManifestCard";

type Props = {
  selected: number
  onSelect: (i: number) => void
};

export function Workloads({ selected, onSelect }: Props) {
  const current = workloads[selected] ?? workloads[0];

  return (
    <div className="split workloads-split">
      <div className="panel panel-list">
        <div className="panel-h">
          <span>deployments</span>
          <span>{workloads.length} items</span>
        </div>
        <table className="resource-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>READY</th>
              <th>STATUS</th>
              <th>AGE</th>
              <th>LABELS</th>
            </tr>
          </thead>
          <tbody>
            {workloads.map((w, i) => (
              <tr
                key={w.name}
                className={i === selected ? "selected" : ""}
                onClick={() => onSelect(i)}
              >
                <td className="name">{w.name}</td>
                <td>{w.ready}</td>
                <td>
                  <span
                    className={`status-pill${w.status === "Completed" ? " completed" : ""}`}
                  >
                    {w.status}
                  </span>
                </td>
                <td>{w.age}</td>
                <td className="labels">{formatLabels(w.labels)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mobile-cards">
          {workloads.map((w, i) => (
            <div
              key={w.name}
              className={`card${i === selected ? " selected" : ""}`}
              onClick={() => onSelect(i)}
            >
              <div className="name">{w.name}</div>
              <div className="meta">
                {w.ready} · {w.status} · {w.age}
              </div>
              <div className="meta labels">{formatLabels(w.labels)}</div>
            </div>
          ))}
        </div>
      </div>
      <DescribePane workload={current} />
      <ManifestCard workload={current} />
    </div>
  );
}
