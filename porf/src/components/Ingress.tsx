import { engineer, ingress } from "../data/cv";
import { contactToYaml } from "../lib/yaml";
import { YamlBlock } from "./YamlBlock";

type Props = {
  selected: number
  onSelect: (i: number) => void
};

export function Ingress({ selected, onSelect }: Props) {
  const current = ingress[selected] ?? ingress[0];

  return (
    <div className="split">
      <div className="panel">
        <div className="panel-h">
          <span>ingress</span>
          <span>{ingress.length} rules</span>
        </div>
        <p className="hint" style={{ padding: "10px 12px 0" }}>
          Routes for {engineer.name}. Press <b>d</b> to download the CV PDF.
        </p>
        <table className="resource-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>HOST / PATH</th>
              <th>BACKEND</th>
              <th>PORT</th>
            </tr>
          </thead>
          <tbody>
            {ingress.map((r, i) => (
              <tr
                key={r.name}
                className={i === selected ? "selected" : ""}
                onClick={() => onSelect(i)}
              >
                <td className="name">{r.name}</td>
                <td>
                  <a
                    href={r.href}
                    {...(r.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    {...(r.name === "cv-download"
                      ? { download: "NguyenTienHuy_DevOps.pdf" }
                      : {})}
                    className={r.external ? "ext-link" : ""}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {r.host}
                  </a>
                </td>
                <td>{r.backend}</td>
                <td>{r.port}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mobile-cards">
          {ingress.map((r, i) => (
            <div
              key={r.name}
              className={`card${i === selected ? " selected" : ""}`}
              onClick={() => onSelect(i)}
            >
              <div className="name">{r.name}</div>
              <div className="meta">{r.host}</div>
            </div>
          ))}
        </div>
      </div>
      <aside className="panel">
        <div className="panel-h">
          <span>describe ingress/contact</span>
          <span>{current.backend}</span>
        </div>
        <div className="describe">
          <div className="describe-meta">
            <div className="title">{current.name}</div>
            <div className="sub">{current.host}</div>
            <a
              href={current.href}
              {...(current.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              {...(current.name === "cv-download"
                ? { download: "NguyenTienHuy_DevOps.pdf" }
                : {})}
              className={current.external ? "ext-link" : ""}
            >
              open backend
            </a>
          </div>
          <YamlBlock text={contactToYaml()} />
        </div>
      </aside>
    </div>
  );
}
