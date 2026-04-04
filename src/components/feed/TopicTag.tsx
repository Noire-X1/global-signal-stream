type Props = { label: string; color: string };

export default function TopicTag({ label, color }: Props) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        fontSize: '9px',
        fontFamily: "'DM Mono', monospace",
        fontWeight: 500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#FFFFFF',
        background: `${color}22`,
        border: `1px solid ${color}55`,
        borderRadius: '2px',
        boxShadow: `0 0 12px ${color}33`,
      }}
    >
      {label}
    </span>
  );
}
