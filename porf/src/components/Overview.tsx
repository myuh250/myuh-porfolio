import { describeLines, engineer, stats } from "../data/cv";
import { useTypewriter } from "../hooks/useTypewriter";

export function Overview() {
  const { text, done, skip } = useTypewriter(describeLines);

  return (
    <section className="hero">
      <div>
        <div className="hero-copy">
          <h1>{engineer.name}</h1>
          <p className="role">{engineer.title}</p>
          <div className="hero-meta">
            <span className="badge">{engineer.badge}</span>
            <span className="kv">{engineer.location}</span>
          </div>
        </div>
        <div className="terminal" onClick={skip} title="Click to skip typing">
          <div className="terminal-bar">
            <div className="terminal-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            kubectl · {engineer.context}
          </div>
          <pre>
            {text}
            {!done ? <span className="cursor" /> : null}
          </pre>
        </div>
      </div>
      <div>
        <div className="stats">
          {stats.map((s) => (
            <article className="stat" key={s.id}>
              <div className="label">{s.label}</div>
              <div className="value">{s.value}</div>
              <div className="detail">{s.detail}</div>
            </article>
          ))}
        </div>
        <article className="edu">
          <div className="k">education</div>
          <div className="school">{engineer.education.school}</div>
          <div className="degree">{engineer.education.degree}</div>
          <div className="kv">
            {engineer.education.period} · {engineer.education.location}
          </div>
        </article>
      </div>
    </section>
  );
}
