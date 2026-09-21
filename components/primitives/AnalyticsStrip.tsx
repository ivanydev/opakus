export default function AnalyticsStrip({ items }: { items: { label: string; value: string; delta: string; tone?: string }[] }) {
  return <div className="analytics-strip">{items.map((item) => <div className={`analytics-tile ${item.tone || ''}`} key={item.label}><span>{item.label}</span><strong>{item.value}</strong><small>{item.delta}</small></div>)}</div>
}