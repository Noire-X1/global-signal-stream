import { motion } from 'framer-motion';

const TABS = ['All', 'Politics', 'Sports', 'Technology', 'Environment', 'Crypto', 'Business'];

type Props = { active: string; onChange: (t: string) => void };

export default function CategoryTabs({ active, onChange }: Props) {
  return (
    <div
      style={{
        display: 'flex', gap: '8px',
        overflowX: 'auto', scrollbarWidth: 'none',
        paddingBottom: '4px',
      }}
    >
      {TABS.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            position: 'relative',
            flexShrink: 0,
            height: '32px',
            padding: '0 16px',
            borderRadius: '999px',
            border: active === tab
              ? '1px solid #A855F7'
              : '1px solid rgba(168,85,247,0.22)',
            background: active === tab
              ? '#A855F7'
              : 'rgba(255,255,255,0.04)',
            color: active === tab ? '#FFFFFF' : '#A1A1AA',
            fontFamily: "'DM Mono', monospace",
            fontSize: '9px', fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase' as const,
            cursor: 'pointer',
            boxShadow: active === tab
              ? '0 0 14px rgba(168,85,247,0.7), 0 0 35px rgba(168,85,247,0.3)'
              : 'none',
            transition: 'all 0.22s ease',
          }}
        >
          {active === tab && (
            <motion.div
              layoutId="tab-pill"
              style={{
                position: 'absolute', inset: 0,
                borderRadius: '999px',
                background: '#A855F7',
                zIndex: -1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          {tab}
        </button>
      ))}
    </div>
  );
}
