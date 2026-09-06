import { useCallback, useMemo, useState } from "react";
import { Certs } from "./components/Certs";
import { Ingress } from "./components/Ingress";
import { Skills } from "./components/Skills";
import { Overview } from "./components/Overview";
import { StatusBar } from "./components/StatusBar";
import { TopBar } from "./components/TopBar";
import { ViewTabs } from "./components/ViewTabs";
import { Workloads } from "./components/Workloads";
import {
  certs,
  engineer,
  ingress,
  nodes,
  workloads,
  type ViewId,
} from "./data/cv";
import { useHashView } from "./hooks/useHashView";
import { useK9sKeys } from "./hooks/useK9sKeys";
import { resourceYaml } from "./lib/yaml";

function countFor(view: ViewId): number {
  switch (view) {
    case "overview":
      return 1;
    case "workloads":
      return workloads.length;
    case "certs":
      return certs.length;
    case "skills":
      return nodes.length;
    case "ingress":
      return ingress.length;
  }
}

export default function App() {
  const { view, setView } = useHashView();
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const count = countFor(view);

  const changeView = useCallback(
    (next: ViewId) => {
      setView(next);
      setSelected(0);
    },
    [setView],
  );

  const onYank = useCallback(() => {
    const { name, yaml } = resourceYaml(view, selected);
    void navigator.clipboard.writeText(yaml).then(() => {
      setToast(name);
      window.setTimeout(() => setToast(null), 2200);
    });
  }, [view, selected]);

  const onDownload = useCallback(() => {
    const a = document.createElement("a");
    a.href = engineer.cvPdf;
    a.download = "NguyenTienHuy_DevOps.pdf";
    a.click();
  }, []);

  useK9sKeys({
    view,
    setView: changeView,
    setSelected,
    count,
    onYank,
    onDownload,
  });

  const body = useMemo(() => {
    switch (view) {
      case "overview":
        return <Overview />;
      case "workloads":
        return <Workloads selected={selected} onSelect={setSelected} />;
      case "ingress":
        return <Ingress selected={selected} onSelect={setSelected} />;
      case "certs":
        return <Certs selected={selected} onSelect={setSelected} />;
      case "skills":
        return <Skills selected={selected} onSelect={setSelected} />;
    }
  }, [view, selected]);

  return (
    <div className="app">
      <TopBar />
      <ViewTabs view={view} onChange={changeView} />
      <main className="main">{body}</main>
      <StatusBar view={view} toast={toast} />
    </div>
  );
}
