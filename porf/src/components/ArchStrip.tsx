import { archFlows, type ArchId } from "../data/cv";

export function ArchStrip({ variant }: { variant: ArchId }) {
  const flows = archFlows[variant];
  return (
    <div className="arch">
      <div className="arch-label">architecture</div>
      {flows.map((flow, i) => (
        <div className="arch-row" key={i}>
          {flow.map((node, j) => (
            <span key={`${node.label}-${j}`} style={{ display: "contents" }}>
              {j > 0 ? <span className="arch-arrow">→</span> : null}
              <span className={`arch-node ${node.kind}`}>{node.label}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
