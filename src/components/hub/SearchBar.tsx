import { useState, useRef } from 'react';

type Props = { onSearch: (q: string) => void };

export default function SearchBar({ onSearch }: Props) {
  const [val, setVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => { if (val.trim()) onSearch(val.trim()); };

  return (
    <div
      className="search-glow"
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        width: '100%', height: '46px', padding: '0 18px',
        borderRadius: '999px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(168,85,247,0.22)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        marginBottom: '12px',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        ref={inputRef}
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
        placeholder="Search intelligence..."
        style={{
          flex: 1, background: 'none', border: 'none', outline: 'none',
          fontFamily: "'DM Mono', monospace",
          fontSize: '13px', color: '#FFFFFF',
          letterSpacing: '0.04em',
        }}
      />

      {val && (
        <button
          onClick={() => { setVal(''); inputRef.current?.focus(); }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#3D4451', fontSize: '16px', lineHeight: 1,
            flexShrink: 0, padding: '0 2px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#A855F7')}
          onMouseLeave={e => (e.currentTarget.style.color = '#3D4451')}
        >
          ×
        </button>
      )}
    </div>
  );
}
