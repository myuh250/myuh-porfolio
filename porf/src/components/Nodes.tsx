import { nodes } from "../data/cv";
import { nodeToYaml } from "../lib/yaml";
import { YamlBlock } from "./YamlBlock";

type Props = {
  selected: number
  onSelect: (i: number) => void
};

export function Nodes({ selected, onSelect }: Props) {
  const current = nodes[selected] ?? nodes[0];

  return (
    <div className="split">
      <div className="panel">
        <div className="panel-h">
          <span>nodes</span>
          <span>{nodes.length} ready</span>
        </div>
        <table className="resource-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>STATUS</th>
              <th>ROLES</th>
              <th>SKILLS</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((n, i) => (
              <tr
                key={n.name}
                className={i === selected ? "selected" : ""}
                onClick={() => onSelect(i)}
              >
                <td className="name">{n.name}</td>
                <td>
                  <span className="status-pill">{n.status}</span>
                </td>
                <td>{n.roles}</td>
                <td className="labels">{n.skills.slice(0, 4).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mobile-cards">
          {nodes.map((n, i) => (
            <div
              key={n.name}
              className={`card${i === selected ? " selected" : ""}`}
              onClick={() => onSelect(i)}
            >
              <div className="name">{n.name}</div>
              <div className="meta">
                {n.status} · {n.roles}
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="panel">
        <div className="panel-h">
          <span>describe node/{current.name}</span>
          <span>{current.status}</span>
        </div>
        <div className="describe">
          <div className="chips">
            {current.skills.map((s) => (
              <span
                key={s}
                className={`chip${/AWS|CloudWatch|ECR|CloudFront|Route53|Bedrock/i.test(s) ? " aws" : ""}`}
              >
                {s}
              </span>
            ))}
          </div>
          <div style={{ height: 12 }} />
          <YamlBlock text={nodeToYaml(current)} />
        </div>
      </aside>
    </div>
  );
}
