import { certs } from "../data/cv";
import { certToYaml } from "../lib/yaml";
import { YamlBlock } from "./YamlBlock";

type Props = {
  selected: number
  onSelect: (i: number) => void
};

export function Certs({ selected, onSelect }: Props) {
  const current = certs[selected] ?? certs[0];

  return (
    <div className="split">
      <div className="panel">
        <div className="panel-h">
          <span>certificates</span>
          <span>{certs.length} items</span>
        </div>
        <table className="resource-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>READY</th>
              <th>ISSUER</th>
              <th>AGE</th>
              <th>COMMON NAME</th>
            </tr>
          </thead>
          <tbody>
            {certs.map((c, i) => (
              <tr
                key={c.name}
                className={i === selected ? "selected" : ""}
                onClick={() => onSelect(i)}
              >
                <td className="name">{c.name}</td>
                <td>
                  <span className="status-pill">{c.ready}</span>
                </td>
                <td className={c.highlight ? "labels" : ""}>{c.issuer}</td>
                <td>{c.age}</td>
                <td>{c.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mobile-cards">
          {certs.map((c, i) => (
            <div
              key={c.name}
              className={`card${i === selected ? " selected" : ""}`}
              onClick={() => onSelect(i)}
            >
              <div className="name">{c.name}</div>
              <div className="meta">
                READY={c.ready} · {c.issuer} · {c.age}
              </div>
              <div className="meta">{c.title}</div>
            </div>
          ))}
        </div>
      </div>
      <aside className="panel">
        <div className="panel-h">
          <span>describe {current.name}</span>
          <span>READY={current.ready}</span>
        </div>
        <div className="describe">
          <div className="describe-meta">
            <div className="title">{current.title}</div>
            <div className="sub">
              issuer={current.issuer} · issued {current.age}
            </div>
            <a
              href={current.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ext-link"
            >
              verify credential
            </a>
          </div>
          <YamlBlock text={certToYaml(current)} />
        </div>
      </aside>
    </div>
  );
}
