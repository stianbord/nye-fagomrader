import { useState } from "react";
import Result, { prompt } from "./result";
import resultSource from "./result.tsx?raw";

const CODE_MARKER = "// --- generert kode ---";

/** Plukk ut den genererte koden fra result.tsx, uten metadata-toppen. */
function generatedCode(source: string): string {
  const start = source.indexOf(CODE_MARKER);
  if (start === -1) return source.trim();
  return source.slice(start + CODE_MARKER.length).trim();
}

function App() {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const code = generatedCode(resultSource);
  const hasResult = prompt.trim().length > 0;

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <header className="toolbar">
        <p className="toolbar-prompt" title={prompt}>
          {hasResult ? prompt : "Ingen kjøring ennå"}
        </p>
        {hasResult && (
          <div className="toolbar-actions">
            <button type="button" onClick={() => setShowCode(!showCode)}>
              {showCode ? "Skjul kode" : "Vis kode"}
            </button>
            <button type="button" onClick={copyCode}>
              {copied ? "Kopiert" : "Kopier kode"}
            </button>
          </div>
        )}
      </header>

      {showCode && <pre className="code">{code}</pre>}

      <main className="canvas">
        {hasResult ? (
          <Result />
        ) : (
          <p className="empty">
            Skriv prompten din i Claude Code. Resultatet dukker opp her.
          </p>
        )}
      </main>
    </>
  );
}

export default App;
