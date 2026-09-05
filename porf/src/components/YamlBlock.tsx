type Props = { text: string };

function colorize(line: string) {
  const keyMatch = line.match(/^(\s*)(- )?([^:]+:)(\s*)(.*)$/);
  if (keyMatch) {
    const [, indent, dash, key, space, rest] = keyMatch;
    return (
      <>
        {indent}
        {dash ? <span className="dash">{dash}</span> : null}
        <span className="key">{key}</span>
        {space}
        {rest ? <span className="str">{rest}</span> : null}
      </>
    );
  }
  const listMatch = line.match(/^(\s*)(- )(.*)$/);
  if (listMatch) {
    const [, indent, dash, rest] = listMatch;
    return (
      <>
        {indent}
        <span className="dash">{dash}</span>
        <span className="str">{rest}</span>
      </>
    );
  }
  return <span className="punct">{line || " "}</span>;
}

export function YamlBlock({ text }: Props) {
  return (
    <pre className="yaml">
      {text.split("\n").map((line, i) => (
        <div key={i}>{colorize(line)}</div>
      ))}
    </pre>
  );
}
