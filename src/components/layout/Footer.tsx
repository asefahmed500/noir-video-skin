export function Footer() {
  return (
    <footer className="footer" style={{ borderTop: '1px solid var(--rail)', padding: '32px 16px', marginTop: '60px', background: 'var(--smoke)' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--stone)' }}>
        <div>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--red)', marginRight: '8px' }} />
          <strong>NOIR</strong> — Video.js v10 Skin Design Challenge Entry
        </div>
        <div>
          Licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>Apache License, Version 2.0</a>
        </div>
        <div>
          Powered by <strong>Video.js v10</strong> &amp; <strong>Mux</strong>
        </div>
      </div>
    </footer>
  );
}
