import { useState } from "react";
import { workloadToYaml } from "../lib/yaml";
import type { Workload } from "../data/cv";
import { ScrollArea } from "./ScrollArea";
import { YamlBlock } from "./YamlBlock";

export function ManifestCard({ workload }: { workload: Workload }) {
  const yaml = workloadToYaml(workload, { highlights: false });
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const block = "```yaml\n" + yaml + "\n```";
    void navigator.clipboard.writeText(block).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <aside className="panel manifest-card">
      <div className="panel-h">
        <span>manifest {workload.name}</span>
        <button type="button" className="copy-btn" onClick={copy}>
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <ScrollArea className="manifest-body">
        <YamlBlock text={yaml} />
      </ScrollArea>
    </aside>
  );
}
